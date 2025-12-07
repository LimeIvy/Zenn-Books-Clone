"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useBook } from "../hooks/useBook";
import { useChapters } from "../hooks/useChapters";
import Spinner from "../../../features/shared/components/ui/Spinner";
import { Book } from "../types/book";
import { client } from "@/features/shared/utils/client";
import Button from "@/features/shared/components/ui/Button";
import { FaEdit, FaTrash } from "react-icons/fa";

export default function EditBookDetail() {
  const params = useParams();
  const router = useRouter();
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
    // 次のチャプター番号を設定
    const nextChapterNumber = (chapters?.length ?? 0) + 1;

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
      mutateChapters(chapters);
    } catch (error) {
      console.error("チャプターの追加に失敗しました:", error);
      alert("チャプターの追加に失敗しました");
    } finally {
      setIsAddingChapter(false);
    }
  };

  const handleEditChapter = async (chapterNumber: number) => {
    router.push(`/books/${bookId}/chapters/${chapterNumber}/edit`);
  };

  const handleDeleteChapter = async (chapterNumber: number) => {
    if (!confirm(`チャプター${chapterNumber}を削除しますか？`)) {
      return;
    }

    try {
      await client.books[":book_id"].chapters[":chapter_number"].$delete({
        param: { book_id: bookId, chapter_number: chapterNumber.toString() },
      });

      // 削除されたチャプターより後ろのチャプターを1つ前にずらして更新
      if (chapters) {
        for (const chapter of chapters) {
          if (chapter.chapter_number > chapterNumber) {
            await client.books[":book_id"].chapters[":chapter_number"].$put({
              param: {
                book_id: bookId,
                chapter_number: chapter.chapter_number.toString(),
              },
              json: {
                chapter_number: chapter.chapter_number - 1,
                name: chapter.name,
                content: chapter.content || "",
              },
            });
          }
        }
      }

      // チャプター一覧を再取得
      await mutateChapters(chapters);
    } catch (error) {
      console.error("チャプターの削除に失敗しました:", error);
      alert("チャプターの削除に失敗しました");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center w-full px-[15%]">
      <form onSubmit={handleSubmit} className="w-full flex flex-col items-center justify-center relative">
        <div className="w-full flex justify-end mb-4">
          <Button type="submit">更新</Button>
        </div>
        {/* 本のタイトルと説明 */}
        <div className="flex flex-col items-center justify-center w-full">
          <input
            name="title"
            type="text"
            value={book?.title || ""}
            onChange={(e) => mutateBook({ ...book, title: e.target.value } as Book, false)}
            minLength={1}
            maxLength={70}
            className="w-full h-full px-5 py-5 text-2xl text-white font-bold border-b hover:bg-background-soft focus:outline-none resize-none"
            placeholder="本のタイトル"
          />
          <textarea
            name="description"
            value={book?.description || ""}
            onChange={(e) => mutateBook({ ...book, description: e.target.value } as Book, false)}
            maxLength={1000}
            className="w-full h-full px-5 py-5 text-2xl text-white/70 hover:bg-background-soft focus:outline-none resize-none"
            placeholder="内容紹介を入力"
          />
        </div>

        {/* チャプター一覧 */}
        <div className="flex flex-col mt-8 w-full">
          <h2 className="text-3xl text-white font-bold">Chapters</h2>
          {chapters && chapters.length > 0 ? (
            <ul className="mt-8 w-full space-y-2">
              {chapters.map((chapter) => (
                <li key={chapter.id} className="flex items-center justify-between mb-3 p-3 bg-background-soft rounded-lg">
                  <div>
                    <span className="text-button-primary">{chapter.chapter_number} </span>
                    <span className="ml-3 text-white whitespace-nowrap text-ellipsis overflow-hidden">{chapter.name}</span>
                  </div>

                  <div>
                    {/* チャプター編集ボタン */}
                    <button
                      type="button"
                      onClick={() => handleEditChapter(chapter.chapter_number)}
                      className="ml-4 cursor-pointer"
                      aria-label="チャプターを編集"
                    >
                      <FaEdit size={18} className="text-white/70 hover:text-blue-400" />
                    </button>

                    {/* チャプター削除ボタン */}
                    <button
                      type="button"
                      onClick={() => handleDeleteChapter(chapter.chapter_number)}
                      className="ml-4 cursor-pointer"
                      aria-label="チャプターを削除"
                    >
                      <FaTrash size={18} className="text-white/70 hover:text-red-400" />
                    </button>
                  </div>
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
            className="w-full px-6 py-3 bg-transparent text-white/50 border border-dashed border-white/50 hover:bg-transparent"
          >
            {isAddingChapter ? "追加中..." : "チャプターを追加"}
          </Button>
        </div>
      </form>
    </div>
  );
}