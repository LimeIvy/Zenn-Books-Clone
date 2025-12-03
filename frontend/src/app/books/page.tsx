import { FaRegUserCircle } from "react-icons/fa";
import Link from "next/link";

const books = [
  {
    id: 1,
    name: "React入門",
    auther: "Lime",
    description:
      "Reactの入門書です。",
  },
  {
    id: 2,
    name: "Vue入門",
    auther: "Lime",
    description: "Vueの入門書です。",
  },
  {
    id: 3,
    name: "Git入門",
    auther: "Lime",
    description: "Gitの入門書です。",
  },
  {
    id: 4,
    name: "Node入門",
    auther: "Lime",
    description: "Nodeの入門書です。",
  },
];

export default function Books() {
  return (
    <div className="min-h-screen">
      <main className="px-[5%] py-8">
        <div>
          <h1 className="text-3xl font-bold">Books</h1>
          <h4 className="mt-1">本の一覧</h4>
        </div>
        <div className="py-6 grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 items-center justify-center gap-3">
          {books.map((book) => (
            <div
              key={book.id}
              className="p-3 mt-5  aspect-3/4 relative bg-background-soft"
            >
              <Link href={`/books/${book.id}`}>
                <h2 className="w-fit max-w-full mx-auto text-lg font-medium whitespace-nowrap overflow-hidden text-ellipsis min-h-[15%] after:w-0 after:h-0.5 after:bg-white/80 after:block after:transition-all after:duration-100 hover:after:w-full hover:scale-103">
                  {book.name}
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
      </main>
    </div>
  );
}
