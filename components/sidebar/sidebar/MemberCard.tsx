import React from "react";
import { UserSmallInfos } from "../../../types/typing";

type Props = {
  userInfo: UserSmallInfos;
};

const MemberCard = ({ userInfo }: Props) => {
  return (
    <button
      type="button"
      className="flex items-center hover:bg-gray-600 w-full p-2 rounded-lg relative -left-2 transition-colors"
    >
      <div className="w-12 h-12 rounded-lg overflow-hidden mr-6">
        <img
          className="w-full h-full object-cover object-center bg-red"
          src={userInfo.image}
          alt="avatar"
        />
      </div>
      <h3 className="text-secondary text-lg font-bold">{userInfo.name}</h3>
    </button>
  );
};

export default MemberCard;
