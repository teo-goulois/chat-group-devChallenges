import React, { FormEvent, useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import Pusher from "pusher-js";

// Components
import Chat from "../../components/channel/Chat";
import Input from "../../components/channel/Input";
// types
import { Chat as ChatType } from "../../types/typing";
// data relative
import useChats from "../../utils/useChats";
import useConnectedUser from "../../utils/useConnectedUser";
import moment from "moment";

const Index = () => {
  const { user } = useConnectedUser();
  const router = useRouter();
  const {
    chats,
    chatsIsLoading,
    chatsIsError,
    updateChats,
    mutateChats,
    setSize,
    chatsIsLoadingMore,
    chatsIsReachingEnd,
    size,
  } = useChats({
    conversationID: router.query.id as string,
    pageSize: 10,
  });
  const [sendingChat, setSendingChat] = useState<ChatType | null>();
  const scrollRef = useRef<null | HTMLDivElement>(null);

  useEffect(() => {
    const pusher = new Pusher(process.env.PUSHER_APP_KEY as string, {
      cluster: process.env.PUSHER_APP_CLUSTER,
    });

    const channel = pusher.subscribe(`channel-${router.query.id}`);

    channel.bind("new-message", (data: any) => {
      mutateChats(data.chat);
      setSendingChat(null);
    });

    return () => {
      pusher.disconnect();
    };
  }, [router.query.id]);

  const handleSubmit = async (
    e: FormEvent<HTMLFormElement>,
    input: string,
    resetInput: () => void
  ) => {
    e.preventDefault();
    if (!user) return console.log("error should be connected");
    if (input.length === 0)
      return console.log("error input should not be empty");

    const body = {
      userID: user._id,
      conversationID: router.query.id as string,
      images: [],
      // @ts-ignore
      text: input,
      author: user,
    };

    setSendingChat({ ...body, isLoading: true });
    updateChats(body);
    resetInput();
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (size === 1) {
      scrollRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [chats]);

  const renderChats = () => {
    let prevDate = "";
    return chats.map((chat, index) => {
      //setPrevDate("chat.createdAt")
      const date = prevDate;
      if (
        prevDate !== "" &&
        prevDate !== moment(chat.createdAt).format("MMM Do YYYY")
      ) {
        prevDate = moment(chat.createdAt).format("MMM Do YYYY");
        return (
          <div ref={index === 0 ? scrollRef : undefined} key={chat._id}>
            <div className="border border-secondary w-full relative my-4">
              <p className="text-secondary font-semibold text-sm absolute px-4 left-[50%] top-[50%] bg-gray-500 -translate-x-2/4 -translate-y-2/4 ">
                {date}
              </p>
            </div>
            <Chat key={chat._id} chat={chat} />
          </div>
        );
      }
      prevDate = moment(chat.createdAt).format("MMM Do YYYY");
      return (
        <div ref={index === 0 ? scrollRef : undefined} key={chat._id}>
          <Chat chat={chat} />;
        </div>
      );
    });
  };

  return (
    <div className="flex flex-col h-[94%]  2xl:items-center p-4 ">
      <div className="h-full overflow-y-scroll w-full 2xl:w-3/5 scrollbar-none scroll-smooth ">
        <div className="flex-1 flex flex-col-reverse  justify-end  ">
          {sendingChat && <Chat chat={sendingChat} />}
          {chatsIsLoading ? (
            <div>Loading...</div>
          ) : chatsIsError ? (
            <p>arror</p>
          ) : chats.length === 0 ? (
            <p className="text-primary font-semibold text-lg">
              No chats yet create one !
            </p>
          ) : (
            renderChats()
          )}
          <button
            type="button"
            className="bg-gray-500 w-fit ml-auto mr-auto text-primary font-medium px-4 py-2 rounded-lg hover:bg-gray-200 disabled:hover:bg-gray-500 transition-colors"
            disabled={chatsIsLoadingMore || chatsIsReachingEnd}
            onClick={() => setSize((prev) => prev + 1)}
          >
            {chatsIsLoadingMore
              ? "loading..."
              : chatsIsReachingEnd
              ? "no more chats"
              : "load more"}
          </button>
        </div>
      </div>
      <Input handleSubmit={handleSubmit} />
    </div>
  );
};

export default Index;
