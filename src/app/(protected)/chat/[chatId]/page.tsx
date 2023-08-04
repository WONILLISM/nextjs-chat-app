"use client";

import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { io, Socket } from "socket.io-client";

import { ChatMessage } from "@/types/chat";
import { useSearchParams } from "next/navigation";

const socket: Socket = io(
  process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
  {
    // autoConnect: false,
    path: "/api/socket/io",
    addTrailingSlash: false,
  }
);

const sendApiSocketChat = async (chatMessage: ChatMessage) => {
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
  const [isConnected, setIsConnected] = useState<boolean>(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);

  const formRef = useRef<HTMLFormElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const searchParams = useSearchParams();
  const [username, setUsername] = useState<string>("");

  const enterChatRoom = async () => {
    await sendApiSocketChat({
      username: "CHAT BOT",
      message: `${username} entered chat room.`,
    });
  };

  const sendMessage = async (chat: ChatMessage) => {
    const response = await sendApiSocketChat(chat);

    return response;
  };

  useEffect(() => {
    if (searchParams) {
      const username = searchParams.get("username");
      setUsername(username || "");
    }
  }, [searchParams, setUsername]);

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

    return () => {
      socket.off("join_room");
    };
  }, [messages, setMessages]);

  useEffect(() => {
    socket.on("message", (message: ChatMessage) => {
      console.log("SEND MESSAGE: ", message.message);
      messages.push(message);
      setMessages([...messages]);
    });

    return () => {
      socket.off("message");
    };
  }, [messages, setMessages]);

  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] max-w-[640px] min-w-[360px]">
      <div className="sticky top-0 w-full py-4 text-black bg-blue-300 border border-blue-600 rounded-lg bg-opacity-30">
        <h1 className="text-2xl font-semibold text-center">Chat Room</h1>
      </div>

      {messages.map((msg, idx) => (
        <div
          key={`${msg.username}_${idx}`}
          className="flex flex-col w-full gap-2"
        >
          {msg.username === "CHAT BOT" ? (
            <div className="block text-center text-xs text-[#4E88BB]">
              {msg.message}
            </div>
          ) : msg.username === username ? (
            <div className="max-w-[80%] flex flex-col self-start gap-1">
              <div className="text-xs text-[#4E88BB]">{msg.username}</div>
              <div className="bg-[#3C86E3] p-2 text-white font-light rounded-lg">
                {msg.message}
              </div>
            </div>
          ) : (
            <div className="max-w-[80%] flex flex-col self-end gap-1">
              <div className="text-xs text-[#4E88BB]">{msg.username}</div>
              <div className="bg-[#CFDAF0] p-2 text-black font-light rounded-lg">
                {msg.message}
              </div>
            </div>
          )}
        </div>
      ))}

      <div className="w-full px-4 py-2 mt-auto bg-blue-300 border border-blue-600 rounded-lg bg-opacity-30">
        <form
          ref={formRef}
          onSubmit={(e) => {
            e.preventDefault();
            if (textareaRef.current && !!textareaRef.current.value) {
              sendMessage({
                username: username || "",
                message: textareaRef.current.value,
              });
              textareaRef.current.value = "";
              textareaRef.current.focus();
            }
          }}
        >
          <div className="flex gap-2">
            <textarea
              ref={textareaRef}
              rows={1}
              className="block w-full p-2 text-sm text-gray-900 bg-white border border-gray-300 rounded-lg resize-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              onKeyDown={(e) => {
                if (e.keyCode == 13 && e.shiftKey == false) {
                  e.preventDefault();
                  formRef.current?.requestSubmit();
                }
              }}
            />

            <button
              type="submit"
              className="px-2 font-light text-white bg-blue-700 rounded-xl disabled:bg-slate-300"
            >
              SEND
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Room;
