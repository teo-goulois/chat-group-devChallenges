import React from "react";
import moment from "moment";

import { Chat } from "../../types/typing";
import useConnectedUser from "../../utils/useConnectedUser";

type Props = {
  chat: Chat;
};

const Chat = ({ chat }: Props) => {
  const { user } = useConnectedUser();

  const isMyChat = () => {
    return chat.author?._id === user?._id;
  };

  return (
    <div
      className={`flex gap-4 mb-4  p-2 ${
        isMyChat() && "flex-row-reverse justify-start"
      }`}
    >
      {chat?.isLoading && <p className="loader"></p>}
      <img
        className="bg-gray-400 h-12 w-12 rounded-lg"
        src={chat.author?.image}
        alt="avatar"
      />
      <div>
        <div
          className={`flex items-center text-secondary gap-4 ${
            isMyChat() && "flex-row-reverse justify-start"
          }`}
        >
          <h2 className=" font-bold text-lg">{chat.author?.name}</h2>
          <span className="font-medium text-sm">
            {moment(chat.createdAt).format("DD[.] MMMM")}
          </span>
        </div>
        <p className={`text-primary mt-2 ${isMyChat() && "text-right"}`}>
          {chat.text}
        </p>
      </div>
    </div>
  );
};

export default Chat;
