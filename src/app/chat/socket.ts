import { io, Socket } from "socket.io-client";

export const socket: Socket = io(
  process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
  {
    // autoConnect: false,
    path: "/api/socket/io",
    addTrailingSlash: false,
  }
);
