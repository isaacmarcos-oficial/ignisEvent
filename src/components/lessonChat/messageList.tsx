import React, { useEffect, useRef } from "react";
import { Message, MessageItem, MessageProps } from "./messageItem";

interface MessageListProps {
  messages: Message[];
}

export function MessageList({ messages}: MessageListProps) {
  const messagesContainerRef = useRef<HTMLDivElement | null>(null);
  
  useEffect(() => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div
      ref={messagesContainerRef}
      className="flex flex-col overflow-y-auto p-3 border border-zinc-800 rounded lg:max-h-[200px] h-[80%] max-h-[380px]"
    >
      {messages.map((message, index) => (
        <MessageItem key={index} message={message}  />
      ))}
    </div>
  );
}
