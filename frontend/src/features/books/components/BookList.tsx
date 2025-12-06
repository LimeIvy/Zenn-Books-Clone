"use client";

import { FaRegUserCircle } from "react-icons/fa";
import Link from "next/link";
import { useBooks } from "../hooks/useBooks";
import Spinner from "../../../features/shared/components/ui/Spinner";

export default function BookList() {
  const { books, isLoading, isError } = useBooks();

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
  return (
    <div>
      {books && books.length ? (
        <div className="py-6 grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 items-center justify-center gap-3">
          {books.map((book) => (
            <div
              key={book.id}
              className="p-3 mt-5  aspect-3/4 relative bg-background-soft"
            >
              <Link href={`/books/${book.id}`}>
                <h2 className="w-fit max-w-full mx-auto text-lg font-medium whitespace-nowrap overflow-hidden text-ellipsis min-h-[15%] after:w-0 after:h-0.5 after:bg-white/80 after:block after:transition-all after:duration-100 hover:after:w-full hover:scale-103">
                  {book.title}
                </h2>
                <p className="mx-5 text-xs wrap-break-word whitespace-pre-wrap overflow-hidden text-ellipsis min-h-[60%] max-h-[60%]">
                  {book.description}
                </p>
              </Link>
              <Link
                href={`/users/${book.auther}`}
                className="absolute flex w-[90%] bottom-1 left-3 min-h-[10%]"
              >
                <FaRegUserCircle size={20} className="min-w-5" />
                <p className="ml-2 whitespace-nowrap overflow-hidden text-ellipsis after:w-0 after:h-0.5 after:bg-white after:block after:transition-all after:duration-50 hover:after:w-full">
                  {book.auther}
                </p>
              </Link>
            </div>
          ))}
        </div>
      ) : (
        <p className="mt-50 flex items-center justify-center">
          本はまだ投稿されていません！
        </p>
      )}
    </div>
  );
}
