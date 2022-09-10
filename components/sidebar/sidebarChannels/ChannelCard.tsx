import { useRouter } from "next/router";
import React from "react";
import { Channel } from "../../../types/typing";

type Props = {
  channel: Channel;
  handleClick: (chan: Channel) => void;
};

const ChannelCard = ({ handleClick, channel }: Props) => {
  const router = useRouter()
  return (
    <button
      onClick={() => handleClick(channel)}
      type="button"
      className={`flex items-center hover:bg-[#303030] w-full p-2 rounded-lg relative -left-2 transition-colors ${router.query.id === channel._id && 'bg-[#303030]'}`}
    >
      <div className="w-12 h-12 rounded-lg overflow-hidden mr-6 bg-gray-500 flex justify-center items-center">
        <p className="font-semibold text-lg text-white-0 uppercase">
          {channel.name.at(0)}
        </p>
      </div>
      <h3 className="text-white-300 uppercase text-lg font-bold">
        {channel.name}
      </h3>
    </button>
  );
};

export default ChannelCard;
