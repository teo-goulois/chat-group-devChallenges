import { Server } from "socket.io";

const ioHandler = (req: any, res: any) => {
  if (!res.socket.server.io) {
    const { id } = req.query;
    console.log(id, "soket io server data");

    console.log("*First use, starting socket.io");

    const io = new Server(res.socket.server);

    io.on("connection", (socket) => {
      console.log("connection");

      socket.on(`message`, (data) => {
        console.log("data api");
        socket.broadcast.emit(`channel-${id}`, data);
      });

      socket.on("disconnect", function () {
        console.log("Got disconnect!");
      });
    });

    res.socket.server.io = io;
  } else {
    /*  const io = res.socket.server.io;
    const data = req.body;
    console.log(data, "data api", req.method);
    io.on(`channel-${data.conversationID}`, (t:any) => {
        console.log(t, "T");
        io.emit("new-chat", { chat: data });
      }); */
    console.log("socket.io already running");
  }
  res.end();
};

export const config = {
  api: {
    bodyParser: false,
  },
};

export default ioHandler;
