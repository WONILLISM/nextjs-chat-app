"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const Chat = () => {
  const router = useRouter();

  const { status, data } = useSession();

  const [username, setUserName] = useState<string>("");

  useEffect(() => {
    if (status === "authenticated") {
      if (data.user && data.user.name) {
        setUserName(data.user.name);
      }
    }
  }, [status, data?.user, data?.user?.name]);

  return (
    <article className="flex items-center justify-center min-h-screen p-4 mx-auto">
      <div className="flex flex-col items-center justify-center min-w-[320px] gap-6 p-4 bg-white rounded-lg shadow-lg">
        {status === "loading" ? (
          <div>Loading...</div>
        ) : (
          <>
            <div>Hi, {username}!</div>
            <div>Enter the Chat Room.</div>
            <button
              className="px-4 py-2 text-white bg-blue-700 rounded-lg shadow-md"
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
