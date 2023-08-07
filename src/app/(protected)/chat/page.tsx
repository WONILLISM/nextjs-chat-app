"use client";

import { useEffect, useState } from "react";

import TextField from "@/components/TextField";

import {
  MdModeEdit as MdModeEditIcon,
  MdCheck as MdCheckIcon,
} from "react-icons/md";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

const Chat = () => {
  const router = useRouter();
  const { data, update } = useSession();

  const [modifyUsername, setModifyUsername] = useState<boolean>(false);
  const [username, setUsername] = useState<string>("");

  const updateUsername = async () => {
    await update({
      ...data,
      user: {
        ...data?.user,
        name: username,
      },
    });
    setModifyUsername(false);
  };

  if (!data) return <div>not data.</div>;

  useEffect(() => {
    if (data) {
      setUsername(data.user?.name || "");
    }
  }, [data]);

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
              onClick={updateUsername}
            >
              <MdCheckIcon className="text-2xl" />
            </button>
          </>
        ) : (
          <>
            <div>Hi, {data.user?.name}!</div>
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
          router.push(`/chat/1`);
        }}
      >
        Enter
      </button>
    </>
  );
};

export default Chat;
