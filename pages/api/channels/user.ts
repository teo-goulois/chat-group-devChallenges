// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "../../../lib/dbConnect";
import Conversation from "../../../model/Conversation";
import { Channel as ConvType } from "../../../types/typing";

type Data = {
  message: string;
  conversation?: ConvType | null;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { conversationID, userID } = req.query;
  await dbConnect();

  if (req.method === "PUT") {
    try {
      const conversation = await Conversation.findOneAndUpdate(
        { _id: conversationID },
        { $push: { members: userID } }
      );

      res.status(200).json({
        message: "you join this Channel",
        conversation: conversation as unknown as ConvType,
      });
    } catch (err) {
      res.status(500).json({ message: "an error occured please try later" });
    }
  }

  if (req.method === "PATCH") {
    try {
      const conversation = await Conversation.findOneAndUpdate(
        { _id: conversationID },
        { $pull: { members: userID } }
      );

      res.status(200).json({
        message: "you left this Channel",
        conversation: conversation as unknown as ConvType,
      });
    } catch (err) {
      res.status(500).json({ message: "an error occured please try later" });
    }
  }
}
