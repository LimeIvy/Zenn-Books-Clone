"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import { useBook } from "../hooks/useBook";
import { useChapters } from "../hooks/useChapters";
import Spinner from "../../../features/shared/components/ui/Spinner";
import { Book } from "../types/book";
import { client } from "@/features/shared/utils/client";
import Button from "@/features/shared/components/ui/Button";
import { FaTrash } from "react-icons/fa";

export default function EditBookDetail() {
  const params = useParams();
  const bookId = params.bookId as string;
  const { book, isBookLoading, isBookError, mutateBook } = useBook(bookId);
  const { chapters, isChaptersLoading, isChaptersError, mutateChapters } = useChapters(bookId);
  
  const [isAddingChapter, setIsAddingChapter] = useState(false);
  
  if (isBookLoading || isChaptersLoading) {
    return (
      <div className="mt-50 flex items-center justify-center">
        <Spinner size={10} />
      </div>
    );
  }

  if (isBookError || isChaptersError) {
    return (
      <div className="flex items-center justify-center">
        本の取得に失敗しました。
      </div>
    );
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await client.books[":id"].$put({ param: { id: bookId }, json: { title: book?.title || "", auther: book?.auther || "", description: book?.description || "" } });
      alert("本の更新に成功しました");
    } catch (error) {
      console.error("本の更新に失敗しました:", error);
    } finally {
      mutateBook(book);
    }
  };

  const handleAddChapter = async () => {
    // 既存のチャプターの最大番号を取得
    const maxChapterNumber = chapters && chapters.length > 0
      ? Math.max(...chapters.map((c) => c.chapter_number))
      : 0;
    
    // 次のチャプター番号を自動設定
    const nextChapterNumber = maxChapterNumber + 1;
    
    setIsAddingChapter(true);
    try {
      await client.books[":book_id"].chapters.$post({
        param: { book_id: bookId },
        json: {
          chapter_number: nextChapterNumber,
          name: "新しいチャプター",
          content: "",
        },
      });
      
      // チャプター一覧を再取得
      mutateChapters();
    } catch (error) {
      console.error("チャプターの追加に失敗しました:", error);
      alert("チャプターの追加に失敗しました");
    } finally {
      setIsAddingChapter(false);
    }
  };

  const handleDeleteChapter = async (chapterNumber: number) => {
    if (!confirm(`チャプター${chapterNumber}を削除しますか？`)) {
      return;
    }
    
    try {
      await client.books[":book_id"].chapters[":chapter_number"].$delete({
        param: { book_id: bookId, chapter_number: chapterNumber.toString() },
      });
      
      // チャプター一覧を再取得
      mutateChapters();
      alert("チャプターの削除に成功しました");
    } catch (error) {
      console.error("チャプターの削除に失敗しました:", error);
      alert("チャプターの削除に失敗しました");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <form onSubmit={handleSubmit} className="flex flex-col items-center justify-center">
        <Button type="submit" className="mt-7">更新</Button>
        {/* 本のタイトルと説明 */}
        <div className="flex flex-col items-center justify-center">
          <input
            name="title"
            type="text"
            value={book?.title || ""}
            onChange={(e) => mutateBook({ ...book, title: e.target.value } as Book, false)}
            minLength={1}
            maxLength={70}
            className="w-full h-full px-5 py-5 text-2xl text-white/70 hover:bg-background-soft rounded-xl focus:outline-none resize-none"
            placeholder="本のタイトル"
          />
          <textarea
            name="description"
            value={book?.description || ""}
            onChange={(e) => mutateBook({ ...book, description: e.target.value } as Book, false)}
            maxLength={1000}
            className="w-full h-full px-5 py-5 text-2xl text-white/70 hover:bg-background-soft rounded-xl focus:outline-none resize-none"
            placeholder="本の説明を入力"
          />
        </div>

        {/* チャプター一覧 */}
        <div className="flex flex-col items-center justify-center mt-8 w-full">
          <h2 className="text-2xl text-white/70">Chapters</h2>
          {chapters && chapters.length > 0 ? (
            <ul className="mt-4 w-full space-y-2">
              {chapters.map((chapter) => (
                <li key={chapter.id} className="flex items-center justify-between p-3 bg-background-soft rounded-lg">
                  <div>
                    <span className="text-button-primary">{chapter.chapter_number} </span>
                    <span className="ml-3 text-white">{chapter.name}</span>
                  </div>

                  {/* チャプター削除ボタン */}
                  <button
                    type="button"
                    onClick={() => handleDeleteChapter(chapter.chapter_number)}
                    className="ml-4 cursor-pointer"
                    aria-label="チャプターを削除"
                  >
                    <FaTrash size={18} className="text-white/70 hover:text-red-400" />
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-white/50">チャプターがありません</p>
          )}
        </div>

        {/* チャプター追加ボタン */}
        <div className="flex flex-col items-center justify-center mt-8 w-full">
          <Button
            onClick={handleAddChapter}
            disabled={isAddingChapter}
            className="px-6 py-3 disabled:cursor-default disabled:bg-button-primary/70 disabled:text-white/50"
          >
            {isAddingChapter ? "追加中..." : "チャプターを追加"}
          </Button>
        </div>
      </form>
    </div>
  );
}