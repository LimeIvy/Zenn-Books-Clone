"use client";

import { useParams } from 'next/navigation';
import { useAtomValue } from 'jotai';
import { useChapter } from "@/features/books/hooks/useChapter";
import { PreviewMarkdown } from "@/features/books/components/PreviewMarkdown";
import { SimpleMdeEditor } from "@/features/books/components/SimpleMdeEditor";
import { isPreviewAtom } from '../stores/Atom';
import { Chapter } from '../types/chapter';
import Spinner from '@/features/shared/components/ui/Spinner';

export const MarkdownEditor = () => {
  const params = useParams();
  const bookId = params.bookId as string;
  const chapterNumber = params.chapterNumber as string;
  const { chapter, isChapterLoading, isChapterError, mutateChapter } = useChapter(bookId, chapterNumber);
  const isPreview = useAtomValue(isPreviewAtom);

  if (isChapterLoading) {
    return (
      <div className="mt-50 flex items-center justify-center">
        <Spinner size={80} />
      </div>
    );
  }

  if (isChapterError) {
    return (
      <div className="flex items-center justify-center z-10">
        <p>本の取得に失敗しました。</p>
      </div>
    );
  }

  return (
    <div className="w-full h-full flex flex-col">
      <input
        name="name"
        type="text"
        value={chapter?.name || ""}
        onChange={(e) => mutateChapter({ ...chapter, name: e.target.value } as Chapter, false)}
        className="text-3xl text-white font-bold mb-8 focus:outline-none"
        placeholder="Title"
      />
      {isPreview ? (
        <PreviewMarkdown markdownValue={chapter?.content || ""} />
      ) : (
        <SimpleMdeEditor markdownValue={chapter?.content || ""} onChange={(value) => mutateChapter({ ...chapter, content: value } as Chapter, false)} />
      )}
    </div>
  );
};