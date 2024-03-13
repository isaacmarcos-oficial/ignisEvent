import React, { useContext, useEffect, useRef } from "react";
import { MessageItem, MessageProps } from "./messageItem";
import { useQuery } from "@apollo/client";
import { GET_CHAT_MESSAGES } from "@/graphql/queries/ead/ChatMessage";
import { ChatMessage } from "@/graphql/types/Ead/ChatMessage";
import { RefetchContext } from "@/Context/RefechContext";
import { formatDistanceToNow } from "date-fns";
import ptLocale from "date-fns/locale/pt";

export function MessageList() {
  const messagesContainerRef = useRef<HTMLDivElement | null>(null);

  const { data, refetch } = useQuery<{ allMessages: ChatMessage[] }>(
    GET_CHAT_MESSAGES,
    {}
  );

  const formatTimeAgo = (time: string) => {
    return formatDistanceToNow(new Date(time), {
      addSuffix: true,
      locale: ptLocale,
    });
  };

  const context = useContext(RefetchContext);

  useEffect(() => {
    if (context && context.setRefetchFunction) {
      context.setRefetchFunction(() => refetch);
    }
  }, [context]);

  useEffect(() => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop =
        messagesContainerRef.current.scrollHeight;
    }
  }, [data?.allMessages]);

  return (
    <div
      ref={messagesContainerRef}
      className="flex flex-col overflow-y-auto p-3 border border-zinc-800 rounded lg:max-h-[200px] lg:h-[200px] h-[80%] max-h-[380px]"
    >
      {data?.allMessages.map((message, index) => (
        <MessageItem
          key={index}
          id={message.id}
          message={message.message}
          sender={message.sender}
          timestamp={formatTimeAgo(message.timestamp)}
        />
      ))}
    </div>
  );
}
