import ReactMarkdown from 'react-markdown';
import breaks from 'remark-breaks';
import remarkGfm from 'remark-gfm';
import 'github-markdown-css/github-markdown.css';

export const PreviewMarkdown = ({ markdownValue }: { markdownValue: string }) => {
  return (
    <>
      <div
        className="markdown-body px-8 py-6 min-h-[700px] overflow-y-auto rounded-lg relative"
        style={{ fontFamily: 'inherit', fontSize: 'inherit' }}
      >
        <p className="absolute top-0 right-0 p-1.5 text-sm text-white/70 bg-[#2e445c]">プレビュー</p>
        <ReactMarkdown remarkPlugins={[remarkGfm, breaks]}>{markdownValue}</ReactMarkdown>
      </div>
    </>
  );
};