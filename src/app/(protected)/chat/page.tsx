"use client";

import { useState } from "react";

import TextField from "@/components/TextField";

import {
  MdModeEdit as MdModeEditIcon,
  MdCheck as MdCheckIcon,
} from "react-icons/md";
import { useRouter } from "next/navigation";

const Chat = () => {
  const router = useRouter();

  const [modifyUsername, setModifyUsername] = useState<boolean>(true);
  const [username, setUsername] = useState<string>("");

  return (
    <>
      <div
        className={`flex ${
          modifyUsername ? "items-end" : "items-center"
        } gap-4`}
      >
        {modifyUsername ? (
          <>
            <TextField
              label="username"
              value={username}
              onChange={(e) => {
                const { value } = e.target;
                setUsername(value);
              }}
            />

            <button
              className="p-2 text-white bg-blue-500 rounded-full disabled:bg-gray-400"
              type="button"
              disabled={!!!username}
              onClick={() => {
                setModifyUsername(false);
              }}
            >
              <MdCheckIcon className="text-2xl" />
            </button>
          </>
        ) : (
          <>
            <div>Hi, {username}!</div>
            <button
              type="button"
              onClick={() => {
                setModifyUsername(true);
              }}
            >
              <MdModeEditIcon />
            </button>
          </>
        )}
      </div>
      <div>Enter the Chat Room.</div>
      <button
        className="px-4 py-2 text-white bg-blue-700 rounded-lg shadow-md disabled:bg-gray-400"
        disabled={modifyUsername}
        onClick={() => {
          if (!!username) {
            router.push(`/chat/1?username=${username}`);
          }
        }}
      >
        Enter
      </button>
    </>
  );
};

export default Chat;
