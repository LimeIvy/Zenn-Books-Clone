import useSWR from "swr";
import { client } from "@/features/shared/utils/client";
import { Book } from "../types/book";

const fetcher = async (key: string): Promise<Book | undefined> => {
  const id = key.replace("book-", "");
  const res = await client.books[":id"].$get({ param: { id } });
  const data = await res.json();
  console.log(data);
  return data as Book;
};

export const useBook = (id: string) => {
  const { data, error, isLoading, mutate } = useSWR<Book | undefined>(
    `book-${id}`,
    fetcher
  );

  return {
    book: data,
    isBookLoading: isLoading,
    isBookError: error,
    mutateBook: mutate,
  };
};
