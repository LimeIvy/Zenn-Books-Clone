import useSWR from "swr";
import { client } from "@/features/shared/utils/client";
import { Chapter } from "../types/chapter";

const fetcher = async (key: string): Promise<Chapter | undefined> => {
  const match = key.match(/^chapter-(.+)-(.+)$/);
  const [, book_id, chapter_number] = match || [];
  
  const res = await client.books[":book_id"].chapters[":chapter_number"].$get({ 
    param: { book_id, chapter_number } 
  });
  const data = await res.json();
  console.log(data);
  return data as Chapter;  
};

export const useChapter = (book_id: string, chapter_number: string) => {
  console.log("book_id", book_id);
  console.log("chapter_number", chapter_number);
  const { data, error, isLoading, mutate } = useSWR<Chapter | undefined>(
    `chapter-${book_id}-${chapter_number}`,
    fetcher
  );

  return {
    chapter: data,
    isChapterLoading: isLoading,
    isChapterError: error,
    mutateChapter: mutate,
  };
};
