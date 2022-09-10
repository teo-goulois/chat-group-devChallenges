import useSWR from "swr";
import { Chat } from "../types/typing";
import useSWRInfinite from "swr/infinite";

type UseChatProps = {
  conversationID: string | undefined;
  pageSize: number;
};

function useChats({ conversationID, pageSize }: UseChatProps) {
  // get all user following tweet and his tweet
  const { data, error, mutate, size, setSize, isValidating } = useSWRInfinite(
    (index) => getKey(index, pageSize, conversationID)
  );

  const issues: any[] = data ? [].concat(...data) : [];
  const isLoadingInitialData = !data && !error;
  const isLoadingMore =
    isLoadingInitialData ||
    (size > 0 && data && typeof data[size - 1] === "undefined");
  const isEmpty = data?.[0]?.length === 0;
  const isReachingEnd =
    isEmpty || (data && data[data.length - 1]?.length < pageSize);
  const isRefreshing = isValidating && data && data.length === size;

  const updateChats = async (chat: Chat) => {
    const response = await fetch(`/api/chats`, {
      method: "POST",
      body: JSON.stringify(chat),
    });
    const data = await response.json();
  };

  const mutateChats = (chat: Chat) => {
    mutate((t) => {
      // @ts-ignore
      const newChat = { ...chat._doc, author: chat.author };
      if (!t) return [newChat];
      return [...t, newChat];
    });
  };

  return {
    size,
    mutate,
    setSize,
    chats: issues,
    chatsIsLoading: isLoadingInitialData,
    chatsIsLoadingMore: isLoadingMore,
    chatsIsError: error,
    chatsIsEmpty: isEmpty,
    chatsIsReachingEnd: isReachingEnd,
    chatsIsRefreshing: isRefreshing,
    updateChats,
    mutateChats,
  };
}

export default useChats;

export const getKey = (
  pageIndex: number,
  pageSize: number,
  conversationID: string | undefined
) => {
  return conversationID
    ? `/api/chats?conversationID=${conversationID}&page=${
        pageIndex * pageSize
      }&limit=${pageSize}`
    : null;
};
