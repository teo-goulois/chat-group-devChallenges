// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "../../lib/dbConnect";
import Chat from "../../model/Chat";
import User from "../../model/User";
import { Chat as ChatType } from "../../types/typing";
import Pusher from "pusher";
import getEnvVar from "../../utils/getEnvVar";

type Data = {
  name: string;
};

const pusher = new Pusher({
  appId: getEnvVar("PUSHER_APP_ID"),
  key: getEnvVar("PUSHER_APP_KEY"),
  secret: getEnvVar("PUSHER_APP_SECRET"),
  cluster: getEnvVar("PUSHER_APP_CLUSTER"),
  encrypted: true,
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await dbConnect();
  const { conversationID, limit } = req.query;
  if (req.method === "GET") {
    try {
      const chats = await Chat.find({ conversationID: conversationID })
        .populate({ path: "author", select: "name image", model: User })
        .sort("createdAt")
        .limit(typeof limit === "string" ? parseInt(limit) : 10);

      return res.status(200).send(chats);
    } catch (err) {
      return res.status(500).json(err);
    }
  }
  if (req.method === "POST") {
    const data = JSON.parse(req.body);
    console.log(data, "data api");

    try {
      var newChat = new Chat({
        conversationID: data.conversationID,
        images: data.images,
        author: data.userID,
        text: data.text,
      });
      // Create new user
      var createdChat = await newChat.save();
      console.log(createdChat, "CreatedChat");

      pusher.trigger(`channel-${data.conversationID}`, "new-message", {
        // @ts-ignore
        chat: { ...createdChat, author: data.author },
      });
      res.status(200).json({
        message: "chat posted",
        chat: createdChat as unknown as ChatType,
      });
    } catch (err) {
      res.status(500).json({ message: "an error occured please try later" });
    }
  }
}
