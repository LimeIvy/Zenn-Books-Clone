import useSWR from "swr";
import { client } from "@/features/shared/utils/client";
import { Chapter } from "../types/chapter";

const fetcher = async (key: string): Promise<Chapter[] | undefined> => {
  const book_id = key.replace("chapters-", "");
  const res = await client.books[":book_id"].chapters.$get({ param: { book_id } });
  console.log("chapters res", res);
  const data = await res.json();
  return data as Chapter[];
};

export const useChapters = (book_id: string) => {
  const { data, error, isLoading, mutate } = useSWR<Chapter[] | undefined>(
    `chapters-${book_id}`,
    fetcher
  );
  return {
    chapters: data,
    isChaptersLoading: isLoading,
    isChaptersError: error,
    mutateChapters: mutate,
  };
};
