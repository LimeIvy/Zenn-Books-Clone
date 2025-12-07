import useSWR from "swr";
import { client } from "@/features/shared/utils/client";
import { Book } from "../types/book";

const fetcher = async (id: string): Promise<Book | undefined> => {
  const res = await client.books[":id"].$get({ param: { id } });
  const data = await res.json();
  
  return data as Book;
};

export const useBook = (id: string) => {
  const { data, error, isLoading } = useSWR<Book | undefined>(
    id,
    fetcher
  );

  return {
    book: data,
    isLoading,
    isError: error,
  };
};
