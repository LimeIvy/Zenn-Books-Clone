import Link from "next/link";
import Button from "@/features/shared/components/ui/Button";

export default function Header() {

  return (
    <header className="sticky top-0 border-b border-gray-300 bg-background px-6 py-3">
      <div className="flex items-center justify-between">
        <Link href="/">
          <h1 className="text-xl font-bold">Zenn Books Clone</h1>
        </Link>
        <Link href="/books/new">
          <Button noop>
            投稿する
          </Button>
        </Link>
      </div>
    </header>
  );
}
