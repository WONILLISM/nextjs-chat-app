"use client";
import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { socket } from "../socket";
import { ChatMessage } from "@/types/chat";
import useUser from "@/hooks/useUser";

export const sendApiSocketChat = async (chatMessage: ChatMessage) => {
  try {
    const response = await axios.post("/api/socket/chat", chatMessage, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    return response.data;
  } catch (error) {
    console.log(error);
  }
};

const Room = () => {
  const { user, status } = useUser();
  const [isConnected, setIsConnected] = useState<boolean>(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);

  const inputRef = useRef<HTMLInputElement>(null);

  const enterChatRoom = async () => {
    await sendApiSocketChat({
      username: "CHAT BOT",
      message: `${user.name} entered chat room.`,
    });
  };

  const sendMessage = async (chat: ChatMessage) => {
    const response = await sendApiSocketChat(chat);

    return response;
  };

  useEffect(() => {
    socket.on("connect", () => {
      console.log("SOCKET CONNECTED!", socket.id);

      setIsConnected(true);
    });
    return () => {
      socket.off("connect");
    };
  }, [setIsConnected]);

  useEffect(() => {
    if (isConnected) {
      enterChatRoom();
    }
  }, [isConnected]);

  useEffect(() => {
    socket.on("join_room", (message: ChatMessage) => {
      console.log(`${message.username} ENTERED CHAT ROOM.`);

      messages.push(message);
      setMessages([...messages]);
    });
  }, [setMessages]);

  useEffect(() => {
    socket.on("message", (message: ChatMessage) => {
      console.log("SEND MESSAGE: ", message.message);
      messages.push(message);
      setMessages([...messages]);
    });

    return () => {
      socket.off("message");
    };
  }, [setMessages]);

  return (
    <div className="flex items-center justify-center w-full h-screen bg-blue-200">
      <div className="flex flex-col items-center justify-center min-h-screen max-w-[640px] min-w-[360px] bg-yellow-200">
        <div className="sticky top-0 w-full py-4 text-black dark:text-white bg-slate-300 dark:bg-slate-950">
          <h1 className="text-2xl font-semibold text-center">Chat Room</h1>
        </div>
        <div className="w-full">
          {messages.map((msg) => (
            <div>
              [{msg.username}]: {msg.message}
            </div>
          ))}
        </div>
        <div className="w-full mt-auto">
          <form
            onSubmit={(e) => {
              e.preventDefault();

              if (inputRef.current) {
                sendMessage({
                  username: user.name,
                  message: inputRef.current.value,
                });
              }
            }}
          >
            <input ref={inputRef} />
            <button type="submit">SEND</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Room;
