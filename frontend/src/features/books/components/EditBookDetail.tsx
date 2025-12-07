"use client";

import { useParams } from "next/navigation";
import { useBook } from "../hooks/useBook";
import Spinner from "../../../features/shared/components/ui/Spinner";
import { Book } from "../types/book";
import { client } from "@/features/shared/utils/client";
import Button from "@/features/shared/components/ui/Button";

export default function EditBookDetail() {
  const params = useParams();
  const bookId = params.bookId as string;
  const { book, isLoading, isError, mutate } = useBook(bookId);

  if (isLoading) {
    return (
      <div className="mt-50 flex items-center justify-center">
        <Spinner size={10} />
      </div>
    );
  }

  if (isError) {
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
      mutate(book);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <form onSubmit={handleSubmit}>
        <input
          name="title"
          type="text"
          value={book?.title || ""}
          onChange={(e) => mutate({ ...book, title: e.target.value } as Book, false)}
          minLength={1}
          maxLength={70}
          className="w-full h-full px-5 py-5 text-2xl text-white/70 hover:bg-background-soft rounded-xl focus:outline-none resize-none"
          placeholder="本のタイトル"
        />
        <textarea
          name="description"
          value={book?.description || ""}
          onChange={(e) => mutate({ ...book, description: e.target.value } as Book, false)}
          maxLength={1000}
          className="w-full h-full px-5 py-5 text-2xl text-white/70 hover:bg-background-soft rounded-xl focus:outline-none resize-none"
          placeholder="本の説明を入力"
        />
        <Button type="submit" className="mt-7 flex items-center justify-center text-md px-6 py-2 text-[18px] disabled:cursor-default disabled:bg-button-primary/70 disabled:text-white/50">更新</Button>
      </form>
    </div>
  );
}