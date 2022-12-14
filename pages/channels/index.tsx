import React from "react";

type Props = {
  handleButton: () => void;
};
const Home = ({ handleButton }: Props) => {
  return (
    <div className="flex flex-col h-[94%] p-2 items-center justify-center ">
      <button
      onClick={handleButton}
        type="button"
        className="bg-blue text-primary rounded-lg px-4 py-2 hover:bg-[#1069ff] transition-colors"
      >
        Select a channel
      </button>
    </div>
  );
};

export default Home;
