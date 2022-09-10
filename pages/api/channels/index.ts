// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "../../../lib/dbConnect";
import Conversation from "../../../model/Conversation";
import User from "../../../model/User";


export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await dbConnect();
  const { userID, q } = req.query;
  if (req.method === "GET") {
    try {
      if (q) {
        const conversations = await Conversation.find(
          q.length > 1
            ? {
                name: { $regex: q },
              }
            : {}
        )
          .populate({ path: "author", model: User, select: "name" })
          .populate({ path: "members", model: User, select: "name image" });

        return res.status(200).send(conversations);
      }
      const conv = await Conversation.find({ members: { $in: userID } })
        .populate({ path: "author", model: User, select: "name" })
        .populate({ path: "members", model: User, select: "name image" });
      return res.status(200).send(conv);
    } catch (err) {
      return res.status(500).json(err);
    }
  }
  if (req.method === "POST") {
    const data = JSON.parse(req.body);

    try {
      var newConversation = new Conversation({
        author: data.author,
        desc: data.desc,
        name: data.name,
        members: data.members,
      });
      // Create new user
      var createdConversation = await newConversation.save();

      res.status(200).send(createdConversation);
    } catch (err) {
      res.status(500).json({ message: "an error occured please try later" });
    }
  }
}
