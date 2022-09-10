import React, { FormEvent, useEffect, useState } from "react";
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

const Index = () => {
  const { user } = useConnectedUser();
  const router = useRouter();
  const { chats, chatsIsLoading, chatsIsError, updateChats, mutateChats } =
    useChats({
      conversationID: router.query.id as string,
      pageSize: 10,
    });
  const [sendingChat, setSendingChat] = useState<ChatType | null>();

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
  };

  return (
    <div className="flex flex-col h-[94%]  2xl:items-center p-4 ">
      <div className="flex-1 2xl:w-3/5">
        {chatsIsLoading ? (
          <div>Loading...</div>
        ) : chatsIsError ? (
          <p>arror</p>
        ) : chats.length === 0 ? (
          <p className="text-primary font-semibold text-lg">
            No chats yet create one !
          </p>
        ) : (
          chats.map((chat) => {
            return <Chat key={chat._id} chat={chat} />;
          })
        )}
        {sendingChat && <Chat chat={sendingChat} />}
      </div>
      <Input handleSubmit={handleSubmit} />
    </div>
  );
};

export default Index;
