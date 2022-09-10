import useSWRInfinite from "swr/infinite";

type UseChannelsProps = {
  userID: string | undefined;
  query: string;
  pageSize: number;
};

function useChannels({ userID, query, pageSize }: UseChannelsProps) {
  // get all user following tweet and his tweet
  const { data, error, mutate, size, setSize, isValidating } = useSWRInfinite(
    (index) => getKey(index, pageSize, userID, query)
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

  const createChannel = async ({
    body,
  }: {
    body: {
      author: string;
      desc: string;
      name: string;
      members: string[];
    };
  }) => {
    mutate(async (t) => {      
      const response = await fetch(`/api/channels`, {
        body: JSON.stringify(body),
        method: "POST",
      });
      const data = await response.json();
      
      if (!t) return;
      return [data, ...t];
    });
  };

  return {
    size,
    mutate,
    setSize,
    channels: issues,
    channelsIsLoading: isLoadingInitialData,
    channelsIsLoadingMore: isLoadingMore,
    channelsIsError: error,
    channelsIsEmpty: isEmpty,
    channelsIsReachingEnd: isReachingEnd,
    channelsIsRefreshing: isRefreshing,
    createChannel
  };
}
export default useChannels;

export const getKey = (
  pageIndex: number,
  pageSize: number,
  userID: string | undefined,
  q: string
) => {
  if (q.length > 0) {
    return userID
      ? `/api/channels?userID=${userID}&q=${encodeURIComponent(q)}&page=${
          pageIndex * pageSize
        }`
      : null;
  }

  return userID
    ? `/api/channels?userID=${userID}&page=${pageIndex * pageSize}`
    : null;
};
