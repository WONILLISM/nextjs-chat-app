import { NextApiResponseServerIO } from "@/types/next";

import { Server as HttpServer } from "http";
import { NextApiRequest } from "next";
import { Server as IOServer } from "socket.io";

export const config = {
  api: {
    bodyParser: false,
  },
};

const io = async (req: NextApiRequest, res: NextApiResponseServerIO) => {
  if (!res.socket.server.io) {
    const path = "/api/socket/io";
    console.log(`New Socket.io server... to ${path}`);
    // adapt Next's net Server to http Server
    const httpServer: HttpServer = res.socket.server;
    const io = new IOServer(httpServer, {
      path: path,
      // @ts-ignore
      addTrailingSlash: false,
      origin: "https://nextjs-chat-app-jet.vercel.app",
      methods: ["GET", "POST"],
    });

    // Event handler for client connections
    io.on("connection", (socket) => {
      console.log(`A client connected. ID: ${socket.id}`);

      // Event handler for receiving messages from the client
      socket.on("join_room", (data) => {
        console.log("Received message:", data.message);
      });

      // Event handler for receiving messages from the client
      socket.on("message", (data) => {
        console.log("Received message:", data.message);
      });

      // Event handler for client disconnections
      socket.on("disconnect", () => {
        console.log("A client disconnected.");
      });
    });

    // append SocketIO server to Next.js socket server response
    res.socket.server.io = io;
  }

  res.end();
};

export default io;
