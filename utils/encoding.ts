export const base64Encode = (str: string) => {
  if (typeof window === "undefined") {
    return Buffer.from(str).toString("base64");
  }
  return window.btoa(
    new TextEncoder()
      .encode(str)
      .reduce((data, byte) => data + String.fromCharCode(byte), "")
  );
};

export const base64Decode = (str: string) => {
  if (typeof window === "undefined") {
    return Buffer.from(str, "base64").toString();
  }
  return new TextDecoder().decode(
    Uint8Array.from(window.atob(str), (char) => char.charCodeAt(0))
  );
};
