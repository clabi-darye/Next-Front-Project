/**
 * 환경별 base64 인코딩/디코딩을 위한 유틸리티 함수들
 */

type DecodedValue = string | number | boolean | object | null;

/**
 * 문자열을 base64로 인코딩합니다.
 * 서버/클라이언트 환경을 자동으로 감지하여 적절한 방법을 사용합니다.
 *
 * @param str - 인코딩할 문자열
 * @returns base64로 인코딩된 문자열
 * @throws {Error} 인코딩 실패 시
 */
export const base64Encode = (str: string): string => {
  try {
    if (typeof window === "undefined") {
      // Node.js 환경
      return Buffer.from(str, "utf-8").toString("base64");
    }

    // 브라우저 환경
    const utf8Bytes = new TextEncoder().encode(str);
    const binaryStr = Array.from(utf8Bytes)
      .map((b) => String.fromCharCode(b))
      .join("");

    return window.btoa(binaryStr);
  } catch (error) {
    throw new Error(
      `base64 인코딩 실패: ${
        error instanceof Error ? error.message : String(error)
      }`
    );
  }
};

/**
 * URL-safe base64 문자열을 정규화합니다.
 * URL 디코딩, 공백 제거, URL-safe 문자 변환, 패딩 추가를 수행합니다.
 *
 * @param str - 정규화할 base64 문자열
 * @returns 정규화된 base64 문자열
 */
const normalizeBase64String = (str: string): string => {
  const decodedStr = decodeURIComponent(str);

  let sanitized = decodedStr
    .replace(/\s/g, "") // 공백 제거
    .replace(/-/g, "+") // URL-safe 문자 변환
    .replace(/_/g, "/"); // URL-safe 문자 변환

  // 패딩 추가
  const padding = 4 - (sanitized.length % 4);
  if (padding !== 4) {
    sanitized += "=".repeat(padding);
  }

  return sanitized;
};

/**
 * 디코딩된 문자열이 JSON인지 확인하고 파싱을 시도합니다.
 * JSON이 아니거나 파싱에 실패하면 원본 문자열을 반환합니다.
 *
 * @param decoded - 디코딩된 문자열
 * @returns 파싱된 JSON 객체 또는 원본 문자열
 */
const tryParseJSON = (decoded: string): DecodedValue => {
  try {
    return JSON.parse(decoded);
  } catch {
    return decoded;
  }
};

/**
 * base64 문자열을 디코딩합니다.
 * URL 인코딩된 base64 문자열도 처리할 수 있으며,
 * 결과가 JSON 형태인 경우 자동으로 파싱합니다.
 *
 * @param str - 디코딩할 base64 문자열 (URL 인코딩 가능)
 * @returns 디코딩된 값 (문자열 또는 파싱된 JSON)
 * @throws {Error} 디코딩 실패 시
 */
export const base64Decode = (str: string): DecodedValue => {
  if (!str || typeof str !== "string") {
    throw new Error("유효하지 않은 입력: 문자열이 필요합니다");
  }

  try {
    const sanitized = normalizeBase64String(str);
    let decoded: string;

    if (typeof window === "undefined") {
      // Node.js 환경
      decoded = Buffer.from(sanitized, "base64").toString("utf-8");
    } else {
      // 브라우저 환경
      const binary = window.atob(sanitized);
      const bytes = Uint8Array.from(binary, (char) => char.charCodeAt(0));
      decoded = new TextDecoder("utf-8").decode(bytes);
    }

    return tryParseJSON(decoded);
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    throw new Error(`base64 디코딩 실패: ${errorMessage}`);
  }
};

/**
 * base64 디코딩을 안전하게 수행합니다.
 * 실패 시 기본값을 반환하고 에러를 로깅합니다.
 *
 * @param str - 디코딩할 base64 문자열
 * @param defaultValue - 실패 시 반환할 기본값
 * @returns 디코딩된 값 또는 기본값
 */
export const safeBase64Decode = (
  str: string,
  defaultValue: DecodedValue = ""
): DecodedValue => {
  try {
    return base64Decode(str);
  } catch (error) {
    console.error("base64 디코딩 실패:", error);
    return defaultValue;
  }
};
