import { motion } from "framer-motion";
import React from "react";
import { ArrowDownIcon } from "../../../icons/Icons";
import { Channel } from "../../../types/typing";
import useChannels from "../../../utils/useChannles";
import useConnectedUser from "../../../utils/useConnectedUser";
import MemberCard from "./MemberCard";

const variants = {
  open: { x: 0, opacity: 1 },
  closed: { x: "-100%", opacity: 0 },
};

type Props = {
  isOpen: boolean;
  close: () => void;
  channelInfo: Channel | null;
};

const Sidebar = ({ isOpen, close, channelInfo }: Props) => {
  const { user } = useConnectedUser();
  const { removeUser } = useChannels({
    pageSize: 10,
    query: "",
    userID: user?._id,
  });
  const handleLeave = () => {
    removeUser({
      channelID: channelInfo?._id as string,
      user: user,
    });
    close();
  };
  return (
    <motion.div
      variants={variants}
      animate={isOpen ? "open" : "closed"}
      transition={{ ease: "easeIn" }}
      className="fixed bg-gray-700 h-full w-full md:w-[500px] flex flex-col z-10"
    >
      <div className="flex-1">
        <div className="flex items-center justify-start  p-4 shadow-lg">
          <button onClick={close} type="button" aria-label="menu">
            <div className="h-10 text-white-200 mr-4 rotate-90">
              <ArrowDownIcon />
            </div>
          </button>
          <h1 className="text-primary font-bold text-lg">All channels</h1>
        </div>
        <div
          style={{ height: "calc(100% - 4.5rem)" }}
          className="p-6 flex flex-col items-start"
        >
          {/* title */}
          <h2 className="text-primary text-lg font-bold uppercase tracking-tight mb-4">
            {channelInfo?.name}
          </h2>
          {/* description */}
          <p className="text-primary text-lg mb-6">{channelInfo?.desc}</p>
          {/* members */}
          <h2 className="text-primary text-lg font-bold uppercase tracking-tight mb-4">
            Members
          </h2>
          {/* card */}
          <div className="flex flex-col gap-2 flex-1 w-full ">
            {channelInfo?.members.map((member) => {
              return <MemberCard key={member._id} userInfo={member} />;
            })}
          </div>
          <button
            type="button"
            onClick={handleLeave}
            className="bg-red text-primary text-lg font-medium px-4 py-2 rounded-lg hover:scale-105 transition-transform relative top-0"
          >
            leave
          </button>
        </div>
      </div>
      <footer className="relative bottom-0 py-6 px-8 flex items-center bg-gray-900">
        <div className="flex-1 flex items-center">
          <div className="w-12 h-12 rounded-lg overflow-hidden mr-8">
            <img
              className="w-full h-full object-cover object-center bg-red"
              src={user?.image}
              alt="avatar"
            />
          </div>
          <h3 className="text-secondary text-lg font-bold">{user?.name}</h3>
        </div>
      </footer>
    </motion.div>
  );
};

export default Sidebar;
