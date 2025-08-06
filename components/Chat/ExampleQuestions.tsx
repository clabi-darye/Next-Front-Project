import { mergeClassNames } from "@/lib/mergeClassNames";
import { useProjectStore } from "@/store/useProjectStore";

interface ExampleQuestionsProps {
  className?: string;
}

const ExampleQuestions = ({ className }: ExampleQuestionsProps) => {
  const projectInfo = useProjectStore((state) => state.projectInfo);

  return (
    <div className={mergeClassNames(className, "w-full")}>
      {projectInfo?.example_questions.map((question, index) => {
        return (
          <div
            key={question.id}
            className="w-full mb-2 border border-neutral-300 rounded-lg py-2 px-6 text-neutral-500 truncate"
          >
            📄 {question.question}
          </div>
        );
      })}
    </div>
  );
};

export default ExampleQuestions;
