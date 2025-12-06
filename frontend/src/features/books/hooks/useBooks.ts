import useSWR from "swr";
import { client } from "@/features/shared/utils/client";
import { Book } from "../types/book";

const fetcher = async (): Promise<Book[] | undefined> => {
  const res = await client.books.$get();
  const data = await res.json();
  return data as Book[];
};

export const useBooks = () => {
  const { data, error, isLoading } = useSWR<Book[] | undefined>(
    "get-books",
    fetcher
  );

  return {
    books: data,
    isLoading,
    isError: error,
  };
};
