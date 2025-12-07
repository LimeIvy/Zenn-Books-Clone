import { MarkdownEditor } from "@/features/books/components/MarkdownEditor";
import { ToolSideBar } from "@/features/books/components/ToolSideBar";

export default function ChapterEdit() {
  return (
    <div className="min-h-screen">
      <main className="w-full h-full py-8 mt-10 flex justify-between">
            <div className="w-[10%]">
            </div>
        <div className="w-[70%] flex flex-col">
          <MarkdownEditor />
        </div>
        <div className="w-[20%]">
        <ToolSideBar />
        </div>
      </main>
    </div>
  );
}
