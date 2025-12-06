"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Button from "../../../features/shared/components/ui/Button";
import Spinner from "../../../features/shared/components/ui/Spinner";
import { client } from "../../../features/shared/utils/client";

export default function CreateBookForm() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const isButtonDisabled = title.trim() === "";

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      const res = await client.books.$post({
        json: {
          title: title,
          auther: "Test Auther",
          description: "",
        },
      });
      const data = await res.json();
      if (data && "id" in data) {
        router.push(`/books/${data.id}`);
      }
    } catch (error) {
      console.error("本の作成に失敗しました:", error);
      setTitle("");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center flex-col">
      <form onSubmit={handleSubmit} className="flex flex-col items-center">
        <div className="relative bg-background-soft rounded-xl max-h-[400px] aspect-3/4 flex flex-col items-center">
          <textarea
            name="title"
            placeholder="本のタイトルを入力"
            className="w-full h-full px-10 py-5 text-2xl focus:outline-none resize-none"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            maxLength={70}
          />
          <p className="absolute bottom-3 right-5 text-sm text-white/70">
            {title.length}
          </p>
        </div>
        <Button
          type="submit"
          className="mt-7 flex items-center justify-center text-md px-6 py-2 text-[18px] disabled:cursor-default disabled:bg-button-primary/70 disabled:text-white/50"
          disabled={isButtonDisabled || isLoading}
        >
          {isLoading ? (
            <>
              <Spinner size={9} />
              <p className="ml-2">本を作成中...</p>
            </>
          ) : (
            <p>本を作成する</p>
          )}
        </Button>
        <p className="mt-6 text-sm text-white/70">
          タイトルはいつでも変更できます。
        </p>
      </form>
    </div>
  );
}
