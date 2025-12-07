"use client";
import { useAtomValue, useSetAtom } from 'jotai';
import { useParams } from 'next/navigation';
import { useChapter } from '@/features/books/hooks/useChapter';
import { client } from '@/features/shared/utils/client';
import { isPreviewAtom } from '../stores/Atom';
import { FaPen } from "react-icons/fa";
import { IoPlayOutline } from "react-icons/io5";
import Button from '@/features/shared/components/ui/Button';

export const ToolSideBar = () => {
  const params = useParams();
  const bookId = params.bookId as string;
  const chapterNumber = params.chapterNumber as string;
  const { chapter, mutateChapter } = useChapter(bookId, chapterNumber);
  const isPreview = useAtomValue(isPreviewAtom);
  const setIsPreview = useSetAtom(isPreviewAtom);

  const handleSave = async () => {
    if (!chapter || !chapterNumber || !chapter.name) {
      alert("チャプターの情報が不足しています");
      return;
    }
    try {
      await client.books[":book_id"].chapters[":chapter_number"].$put({ 
        param: { book_id: bookId, chapter_number: chapterNumber }, 
        json: { chapter_number: parseInt(chapterNumber), name: chapter.name, content: chapter.content || "" } 
      });
      alert("チャプターの保存に成功しました");
    } catch (error) {
      console.error("チャプターの保存に失敗しました:", error);
    } finally {
      mutateChapter(chapter);
    }
  };
  return (
    <div className="w-full h-full flex flex-col items-center gap-5">
      <div>
        <Button onClick={handleSave}>
          <p>保存</p>
        </Button>
      </div>
      <div className="flex items-center gap-1 bg-background-soft rounded-full p-1">
        <button
          onClick={() => setIsPreview(false)}
          className={`p-3 rounded-full transition-colors cursor-pointer ${!isPreview
            && "bg-button-primary/60"
            }`}
        >
          <FaPen size={12} />
        </button>
        <button
          onClick={() => setIsPreview(true)}
          className={`p-3 rounded-full transition-colors cursor-pointer ${isPreview
            && "bg-button-primary/60"
            }`}
        >
          <IoPlayOutline size={12} />
        </button>
      </div>

    </div>
  );
};