import { useState } from "react";
import { ChatHeader } from "./chatHeader";
import { MessageInput } from "./messageInput";
import { MessageList } from "./messageList";
import { formatDistanceToNow } from "date-fns";
import ptLocale from "date-fns/locale/pt";

interface Message {
  author: {
    name: string;
    avatar: string;
  };
  text: string;
  timestamp: string;
}

export function LiveChat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [userName, setUserName] = useState(
    () => localStorage.getItem("name") || ""
  );

  const handleSendMessage = (newMessageText: string) => {
    const currentTime = new Date();

    const formatTimeAgo = (time: Date) => {
      return formatDistanceToNow(time, { addSuffix: true, locale: ptLocale });
    };

    const newMessage: Message = {
      author: {
        name: userName || "Anônimo",
        avatar: "https://i.pravatar.cc/300",
      },
      text: newMessageText,
      timestamp: formatTimeAgo(currentTime),
    };

    setMessages([...messages, newMessage]);
  };

  return (
    <div className="min-h-[350px] border space-y-3 border-zinc-800 rounded p-4 overflow-hidden">
      <ChatHeader />
      <MessageList messages={messages} />
      <MessageInput onSendMessage={handleSendMessage} />
    </div>
  );
}
