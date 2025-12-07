import { useMemo } from "react";
import dynamic from "next/dynamic";
const ReactSimpleMdeEditor = dynamic(() => import("react-simplemde-editor"), {
  ssr: false,
});
import "easymde/dist/easymde.min.css";

type Props = {
  markdownValue: string;
  onChange: (value: string) => void;
};

export const SimpleMdeEditor = ({ markdownValue, onChange }: Props) => {
  const options = useMemo(() => {
    return {
      autofocus: true,
      spellChecker: false,
      toolbar: [],
      minHeight: "600px",
      status: false
    };
  }, []);
  return (
    <div className="w-full bg-editor-background rounded-lg p-4">
      <ReactSimpleMdeEditor
        value={markdownValue}
        onChange={onChange}
        options={options}
      />
    </div>
  );
};