import { mergeClassNames } from "@/lib/mergeClassNames";

const AIDESCRIPTION =
  "인공지능은 방대한 데이터를 기반으로 답변을 생성하나 질문에 따라 부정확한 정보가 포함될 수 있습니다.";

const AiDisclaimer = ({ className }: { className?: string }) => {
  return (
    <div
      className={mergeClassNames(
        className,
        "text-gray-400 text-xs text-center"
      )}
      dangerouslySetInnerHTML={{ __html: AIDESCRIPTION }}
    ></div>
  );
};

export default AiDisclaimer;
