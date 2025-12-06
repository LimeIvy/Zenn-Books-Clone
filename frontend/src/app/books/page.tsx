import BookList from "../../features/books/components/BookList";

export default function Books() {
  return (
    <div className="min-h-screen">
      <main className="px-[5%] py-8">
        <div>
          <h1 className="text-3xl font-bold">Books</h1>
          <h4 className="mt-1 ml-1">本の一覧</h4>
        </div>
        <BookList />
      </main>
    </div>
  );
}
