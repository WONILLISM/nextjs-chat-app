"use client";
import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import UserNameInput from "@/components/chat/UserNameInput";
import { ChatMessage } from "@/types/chat";

const Chat = () => {
  const [isConnected, setIsConnected] = useState<boolean>(false);

  const [inputs, setInputs] = useState<ChatMessage>({
    username: "",
    message: "",
  });

  const { data, status } = useSession();

  useEffect(() => {
    if (data && data.user?.name) {
      setInputs({ ...inputs, username: data.user.name! });
    }
  }, [data, data?.user?.name]);

  if (status === "loading") {
    return <div>Loading ...</div>;
  }

  return (
    <div className="flex items-center justify-center min-h-screen p-4 mx-auto ">
      <div className="flex flex-col items-center justify-center w-full h-full gap-4">
        <div>Enter the Chat Room.</div>
        <UserNameInput
          type="text"
          value={inputs.username}
          placeholder="Input your nickname."
          onChange={(e) => setInputs({ ...inputs, username: e.target.value })}
          // onKeyUp={(e) => {
          //   if (e.key === "Enter") {
          //     setUserName(userNameInput);
          //   }
          // }}
        />
      </div>
    </div>
  );
};

export default Chat;
