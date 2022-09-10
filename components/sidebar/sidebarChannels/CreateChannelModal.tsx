import { motion } from "framer-motion";
import { userAgent } from "next/server";
import React, { Dispatch, SetStateAction, useState } from "react";
import useAutoIncreaseHeight from "../../../hooks/useAutoIncreaseHeight";
import useChannels from "../../../utils/useChannles";
import useConnectedUser from "../../../utils/useConnectedUser";
import Backdrop from "../../backdrops/BackdropModal";

type Props = {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
};

type FormValues = {
  name: string;
  desc: string;
};

const CreateChannelModal = ({ isOpen, setIsOpen }: Props) => {
  const { user } = useConnectedUser();
  const { createChannel } = useChannels({
    userID: user._id,
    pageSize: 10,
    query: "",
  });
  const [formValues, setFormValues] = useState<FormValues>({
    name: "",
    desc: "",
  });
  const textareaRef = useAutoIncreaseHeight(formValues.desc);

  const handleFormChange = (
    e:
      | React.ChangeEvent<HTMLTextAreaElement>
      | React.ChangeEvent<HTMLInputElement>
  ) => {
    setFormValues((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!user) return console.log("error you should be connected");
    const body: {
      author: string;
      desc: string;
      name: string;
      members: string[];
    } = {
      author: user._id,
      desc: formValues.desc,
      name: formValues.name,
      members: [user._id],
    };
    createChannel({
      body,
    });
    setIsOpen(false);
  };

  return (
    <Backdrop onClick={() => setIsOpen(false)}>
      <motion.form
        onSubmit={handleSubmit}
        animate={{ opacity: 1 }}
        onClick={(e) => e.stopPropagation()}
        className="bg-gray-700 rounded-3xl flex flex-col gap-6 lg:max-w-[800px] p-6 w-3/5 opacity-0"
      >
        <h1 className="uppercase text-primary text-lg font-bold">
          New channel
        </h1>
        <div className="flex flex-col">
          <span className="text-secondary self-end">
            {`${formValues.name.length.toString()} / 30`}{" "}
          </span>

          <input
            name="name"
            onChange={(e) => handleFormChange(e)}
            value={formValues.name}
            maxLength={30}
            type="text"
            className="bg-gray-200 p-2 rounded-lg outline-none text-primary"
            placeholder="Channel name"
          />
        </div>
        <div className="flex flex-col">
          <span className="text-secondary self-end">
            {`${formValues.desc.length.toString()} / 250`}{" "}
          </span>
          <textarea
            name="desc"
            maxLength={250}
            aria-label="Write your tweet"
            onChange={(e) => handleFormChange(e)}
            ref={(element) => {
              textareaRef.current = element;
            }}
            className="bg-gray-200 p-2 rounded-lg resize-none outline-none text-primary"
            placeholder="Channel description"
          ></textarea>
        </div>
        <button
          disabled={formValues.desc.length < 1 || formValues.name.length < 1}
          type="submit"
          className="bg-blue text-white-0 rounded-lg ml-auto w-fit px-4 py-2 disabled:bg-gray-200 disabled:text-secondary transition-colors"
        >
          Save
        </button>
      </motion.form>
    </Backdrop>
  );
};

export default CreateChannelModal;
