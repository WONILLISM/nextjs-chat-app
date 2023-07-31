import { ChatMessage } from "@/types/chat";

export const sendApiSocketChat = async (msg: ChatMessage) => {
  const response = fetch("/api/socket/chat", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(msg),
  });
};
