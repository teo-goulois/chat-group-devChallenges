import { User } from "next-auth";
import { signOut } from "next-auth/react";
import Link from "next/link";
import React from "react";
import useLogoutModal from "../../../hooks/useLogoutModal";
import {
  ArrowDownIcon,
  LogOutIcon,
  ProfileIcon,
  TweeterIcon,
} from "../../../icons/Icons";
import useConnectedUser from "../../../utils/useConnectedUser";
import ModalContainer from "../../ModalContainer";
//

type Props = {
  userImge: string | undefined;
  userName: string | undefined;
  modalOpen: boolean;
  open: () => void;
};

const Footer = ({ userImge, userName, modalOpen, open }: Props) => {
  const { user } = useConnectedUser();
  return (
    <footer className="relative py-6 px-8 flex items-center bg-gray-900 w-full h-auto">
      <div className="flex-1 flex items-center">
        <div className="w-12 h-12 rounded-lg overflow-hidden mr-8">
          {userImge ? (
            <img
              className="w-full h-full object-cover object-center bg-red"
              src={userImge}
              alt="avatar"
            />
          ) : (
            <div className="w-full h-full animate-pulse bg-gray-500"></div>
          )}
        </div>
        {userName ? (
          <h3 className="text-secondary text-lg font-bold">{userName}</h3>
        ) : (
          <div className="w-2/4 h-6 rounded-lg animate-pulse bg-gray-500"></div>
        )}
      </div>
      <button
        onClick={() => open()}
        type="button"
        aria-label="open option"
        className="h-6 text-white-300"
      >
        <ArrowDownIcon />
      </button>
      {modalOpen && (
        <ModalContainer>
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-gray-500 border border-gray-200 p-3 rounded-xl absolute -top-36 right-8 z-20"
          >
            <Link href={`https://tweeter-dev-challenges.vercel.app/profile`}>
              <a
                target="_blank"
                className="mb-2 flex items-center px-4 py-2 text-primary hover:bg-gray-200 rounded-lg cursor-pointer capitalize text-sm font-medium"
              >
                <div className="h-6 mr-4">
                  <ProfileIcon />
                </div>
                my profile
              </a>
            </Link>
            <Link passHref href={"https://tweeter-dev-challenges.vercel.app"}>
              <a
                target="_blank"
                className="mb-2 flex items-center px-4 py-2 text-primary hover:bg-gray-200 rounded-lg cursor-pointer capitalize text-sm font-medium w-[200px] "
              >
                <div className="h-5 mr-4">
                  <TweeterIcon />
                </div>
                tweeter
              </a>
            </Link>
            <div id="diver" className="h-0 border border-gray-200 mb-4"></div>
            <div
              onClick={() => signOut()}
              className="mb-2 flex items-center px-4 py-2 text-red hover:bg-gray-200 rounded-lg cursor-pointer capitalize text-sm font-medium w-[200px] "
            >
              <div className="h-6 mr-4 ">
                <LogOutIcon />
              </div>
              logout
            </div>
          </div>
        </ModalContainer>
      )}
    </footer>
  );
};

export default Footer;
