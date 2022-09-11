import React, { useState } from "react";
import { AddIcon, SearchIcon } from "../../../icons/Icons";
import useChannels from "../../../utils/useChannles";
import useConnectedUser from "../../../utils/useConnectedUser";
import BackdropInvisible from "../../backdrops/BackdropInvisible";
import ModalContainer from "../../ModalContainer";
import CreateChannelModal from "./CreateChannelModal";
import Sidebar from "../sidebar/Sidebar";
import Footer from "./Footer";
import ChannelCard from "./ChannelCard";
import useModal from "../../../hooks/useModal";
import { Channel } from "../../../types/typing";
import { useDebounce } from "../../../hooks/useDebounce";
import { useRouter } from "next/router";

const variants = {
  open: { x: 0, opacity: 1 },
  closed: { x: "-100%", opacity: 0 },
};

type Props = {
  setChannelName: React.Dispatch<React.SetStateAction<string>>;
};

const SidebarChannels = ({ setChannelName }: Props) => {
  const router = useRouter();
  const { user } = useConnectedUser();
  const [searchInput, setSearchInput] = useState<string>("");
  const debouncedQuery = useDebounce(searchInput, 500);
  const {
    channels,
    channelsIsError,
    channelsIsLoading,
    addUser,
    channelsIsLoadingMore,
    channelsIsReachingEnd,
    setSize
  } = useChannels({
    pageSize: 5,
    query: debouncedQuery,
    userID: user?._id,
  });

  const [activeChannel, setActiveChannel] = useState<null | Channel>(null);
  const { modalOpen, close, open } = useModal();
  const {
    modalOpen: channelOpen,
    close: closeChannel,
    open: openChannel,
  } = useModal();

  const [createChannelIsOpen, setCreateChannelIsOpen] =
    useState<boolean>(false);
  const handleAddChannel = () => {
    setCreateChannelIsOpen(true);
  };

  const handleClick = async (chan: Channel) => {
    console.log(chan, "chan");
    const membersIds = chan.members.map((member) => {
      return member._id;
    });
    if (user && !membersIds.includes(user._id)) {
      addUser({
        channelID: chan._id,
        user: user,
      });
    }
    setChannelName(chan.name);
    router.push(`/channels/${chan._id}`);
    setActiveChannel(chan);
    openChannel();
  };

  return (
    <>
      <ModalContainer>
        {createChannelIsOpen && (
          <CreateChannelModal
            isOpen={createChannelIsOpen}
            setIsOpen={setCreateChannelIsOpen}
          />
        )}
      </ModalContainer>
      <div className="bg-gray-700 h-screen w-full flex flex-col md:w-[400px] lg:w-[500px] ">
        <div className="flex-1 flex flex-col">
          <ModalContainer>
            <Sidebar
              channelInfo={activeChannel}
              isOpen={channelOpen}
              close={closeChannel}
            />
          </ModalContainer>
          <div className="flex items-center justify-between p-4 shadow-lg">
            <h1 className="text-primary font-bold text-lg">Channels</h1>
            <button
              data-testid="add-channel"
              onClick={() => handleAddChannel()}
              type="button"
              aria-label="menu"
              className="bg-gray-500 rounded-lg flex items-center justify-center h-8 p-1 text-white-200"
            >
              <AddIcon />
            </button>
          </div>

          <div className="px-6 py-2 flex flex-col flex-grow-[1] basis-2">
            {/* search input */}
            <div className="mb-6 bg-gray-200 rounded-lg px-2 py-3 flex justify-start border focus-within:border-gray-400 transition-colors">
              <div className="h-6 text-white-0 mr-2">
                <SearchIcon />
              </div>
              <input
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                type="text"
                placeholder="Search"
                className="bg-inherit text-white-0 placeholder:text-secondary font-medium outline-none w-full"
              />
            </div>
            {/* liste of channels */}
            <ul className="flex flex-col gap-2 px-2  w-full overflow-y-scroll flex-grow-[1] scrollbar-none basis-2">
              {/* card */}
              {channelsIsLoading ? (
                <>
                  <li className=" w-full h-14 rounded-lg relative -left-2 animate-pulse bg-gray-500 mb-2"></li>
                  <li className=" w-full h-14 rounded-lg relative -left-2 animate-pulse bg-gray-500 mb-2"></li>
                  <li className=" w-full h-14 rounded-lg relative -left-2 animate-pulse bg-gray-500 mb-2"></li>
                </>
              ) : channelsIsError ? (
                <p>erorr</p>
              ) : (
                channels.map((channel) => {
                  return (
                    <li key={channel._id}>
                      <ChannelCard
                        channel={channel}
                        handleClick={handleClick}
                      />
                    </li>
                  );
                })
              )}
              <button
              type="button"
              className="bg-gray-500 text-primary font-medium px-4 py-2 rounded-lg hover:bg-gray-200 disabled:hover:bg-gray-500 transition-colors"
                disabled={channelsIsLoadingMore || channelsIsReachingEnd}
                onClick={() => setSize(prev => prev + 1)}
              >
                {channelsIsLoadingMore
                  ? "loading..."
                  : channelsIsReachingEnd
                  ? "no more channels"
                  : "load more"}
              </button>
            </ul>
          </div>
        </div>
        <Footer
          modalOpen={modalOpen}
          open={open}
          userImge={user?.image}
          userName={user?.name}
        />
      </div>
      {modalOpen && <BackdropInvisible onClick={close}></BackdropInvisible>}
    </>
  );
};

export default SidebarChannels;
