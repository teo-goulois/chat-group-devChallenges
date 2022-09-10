import { motion } from "framer-motion";
import React, { useState } from "react";
import Backdrop from "../backdrops/BackdropSidebar";
import ModalContainer from "../ModalContainer";
import Navbar from "../navbar/Navbar";
import Sidebar from "../sidebar/sidebar/Sidebar";
import SidebarChannels from "../sidebar/sidebarChannels/SidebarChannels";

type Props = {
  children: React.ReactNode;
};

const variants = {
  open: { x: 0, opacity: 1 },
  closed: { x: "-100%", opacity: 0 },
};

const Layout = ({ children }: Props) => {
  const [sidebarChannelsIsOpen, setSidebarChannelsIsOpen] =
    useState<boolean>(false);
  const [channelName, setChannelName] = useState<string>("");

  const [sidebarIsOpen, setSidebarIsOpen] = useState<boolean>(false);

  return (
    <div className="h-screen w-screen bg-gray-500 font-['Noto Sans'] flex items-start">
      <div className="hidden md:flex relative h-full">
        <SidebarChannels setChannelName={setChannelName} />
      </div>
      <div className="md:hidden h-full">
        <ModalContainer>
          {sidebarChannelsIsOpen && (
            <Backdrop onClick={() => setSidebarChannelsIsOpen(false)}>
              <motion.div
                onClick={(e) => e.stopPropagation()}
                variants={variants}
                initial="closed"
                animate={sidebarChannelsIsOpen ? "open" : "closed"}
                exit="closed"
                transition={{ ease: "easeIn" }}
                className="fixed h-full w-4/5"
              >
                <SidebarChannels setChannelName={setChannelName} />
              </motion.div>
            </Backdrop>
          )}
        </ModalContainer>
      </div>
      <Navbar setIsOpen={setSidebarChannelsIsOpen} channelName={channelName}>
        {children}
      </Navbar>
    </div>
  );
};

export default Layout;
