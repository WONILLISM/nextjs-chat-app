"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

import TextField from "@/components/TextField";

import {
  MdModeEdit as MdModeEditIcon,
  MdCheck as MdCheckIcon,
} from "react-icons/md";

const Chat = () => {
  const router = useRouter();

  const { data, status } = useSession();

  const [modifyUsername, setModifyUsername] = useState<boolean>(false);
  const [username, setUsername] = useState<string>("");

  useEffect(() => {
    if (data && data.user) {
      console.log("!!!");
      setUsername(data.user.name!);
    }
  }, [data]);

  return (
    <article className="flex items-center justify-center min-h-screen p-4 mx-auto">
      <div className="flex flex-col items-center justify-center min-w-[320px] gap-6 p-4 bg-white rounded-lg shadow-lg">
        {status === "loading" ? (
          <div>Loading...</div>
        ) : (
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
                  <div>Hi, {data?.user?.name}!</div>
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
        )}
      </div>
    </article>
  );
};

export default Chat;
