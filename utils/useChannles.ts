import { User } from "next-auth";
import useSWRInfinite from "swr/infinite";
import { UserSmallInfos } from "../types/typing";

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

  type AddUserProps = {
    channelID: string;
    user: User;
  };

  const addUser = async ({ channelID, user }: AddUserProps) => {
    const res = await fetch(
      `/api/channels/user?conversationID=${channelID}&userID=${userID}`,
      { method: "PUT" }
    );
    if (res.status === 200) {
      return mutate((channels) => {
        const arr = [],
          size = 10;
        let newIssue = issues.find((item) => item._id === channelID);
        if (!newIssue) return;
        newIssue.members = [
          ...newIssue.members,
          { _id: user._id, image: user.image, name: user.name },
        ];
        if (!channels) return;
        while (channels.length > 0) arr.push(channels.splice(0, size));
        return arr[0];
      }, false);
    }
    return console.log("an error occured please try again later");
  };

  const removeUser = async ({ channelID, user }: AddUserProps) => {
    const res = await fetch(
      `/api/channels/user?conversationID=${channelID}&userID=${user._id}`,
      { method: "PATCH" }
    );
    if (res.status === 200) {
      return mutate((channels) => {
        const arr = [],
          size = 10;
        let newIssue = issues.find((item) => item._id === channelID);
        if (!newIssue) return;
        newIssue.members = newIssue.members.filter(
          (item: UserSmallInfos) => item._id !== user._id
        );
        if (!channels) return;
        const newChannels = channels.filter((item) => item._id !== channelID);
        while (newChannels.length > 0) arr.push(newChannels.splice(0, size));
        return arr[0];
      }, false);
    }
    return console.log("an error occured please try again later");
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
    createChannel,
    addUser,
    removeUser,
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
        }&limit=${pageSize}`
      : null;
  }

  return userID
    ? `/api/channels?userID=${userID}&page=${pageIndex * pageSize}&limit=${pageSize}`
    : null;
};
