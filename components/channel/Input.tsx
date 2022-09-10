import React, { FormEvent, useState } from "react";
import { SendIcon } from "../../icons/Icons";

type Props = {
  handleSubmit: (e: FormEvent<HTMLFormElement>, input: string, resetInput: () => void ) => void;
};

const Input = ({ handleSubmit }: Props) => {
  const [input, setInput] = useState<string>("");
  const resetInput = () => {
    setInput('')
  }
  return (
    <form
      onSubmit={(e) => handleSubmit(e, input, resetInput)}
      className="bg-gray-200 rounded-xl flex p-2 w-full 2xl:w-3/5"
    >
      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        type="text"
        placeholder="Type a message here"
        className="bg-transparent text-primary font-medium placeholder:text-secondary p-2 w-full outline-none"
      />
      <button
        type="submit"
        aria-label="send"
        className="bg-blue rounded-lg hover:scale-105 transition-transform"
      >
        <div className="h-12 text-white-0 p-3">
          <SendIcon />
        </div>
      </button>
    </form>
  );
};

export default Input;
