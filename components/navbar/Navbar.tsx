import { useRouter } from "next/router";
import React, { PropsWithChildren } from "react";
import { MenuIcon } from "../../icons/Icons";

type Props = {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  channelName: string
};

const Navbar = ({ setIsOpen, children, channelName }: PropsWithChildren<Props>) => {
  const router = useRouter()
  const handleMenu = () => {
    setIsOpen((prev) => !prev);
  };
  return (
    <div className="w-full h-full">
      <div className="flex items-center justify-start bg-gray-500 p-4 shadow-lg w-full min-h-[3.7rem] ">
        <button
          className="md:hidden"
          type="button"
          aria-label="menu"
          onClick={handleMenu}
        >
          <div className="h-10 text-white-200 mr-4">
            <MenuIcon />
          </div>
        </button>
        <h1 className="uppercase text-primary font-bold text-lg">
          {channelName}
        </h1>
      </div>
      {React.Children.map(children, (child) => {
        // @ts-ignore
        return React.cloneElement(child, {
          handleButton: handleMenu,
        });
      })}
    </div>
  );
};

export default Navbar;
