import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
// Icons
import React from "react";
import Chat from "../components/channel/Chat";
import Input from "../components/channel/Input";

const Home: NextPage = () => {
  return (
    <div className="flex flex-col h-[94%] p-2 ">
      <div className="flex-1">
      <Chat />
      </div>
      <Input />
    </div>
  );
};

export default Home;
