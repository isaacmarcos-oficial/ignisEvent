import { useContext, useEffect, useRef, useState } from "react";
import { MessageItem } from "./messageItem";
import { useQuery } from "@apollo/client";
import { GET_CHAT_MESSAGES } from "@/graphql/queries/ead/ChatMessage";
import { ChatMessage } from "@/graphql/types/Ead/ChatMessage";
import { RefetchContext } from "@/Context/RefechContext";
import { formatDistanceToNow } from "date-fns";
import ptLocale from "date-fns/locale/pt";
import io from 'socket.io-client';

export function MessageList() {
  const messagesContainerRef = useRef<HTMLDivElement | null>(null);

  const [messages, setMessages] = useState<ChatMessage[]>([]);

  const { data, refetch } = useQuery<{ allMessages: ChatMessage[] }>(
    GET_CHAT_MESSAGES,
    {}
  );

  useEffect(() => {
    if (data?.allMessages) {
      setMessages(data.allMessages);
    }
  }, [data?.allMessages]);

  const socket = io('https://ignisdash-server.vercel.app/4001');

  useEffect(() => {
    socket.on('receiveMessage', (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    return () => {
      socket.off('receiveMessage');
    };
  }, []);

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
  }, [messages]);

  return (
    <div
      ref={messagesContainerRef}
      className="flex flex-col overflow-y-auto p-3 border border-zinc-800 rounded lg:max-h-[200px] lg:h-[200px] h-[80%] max-h-[380px]"
    >
      {messages.length === 0 ? (
        <div className="flex flex-1 justify-center items-center text-zinc-500">
          Nenhuma mensagem no momento
        </div>
      ) : (
        messages.map((message, index) => (
          <MessageItem
            key={index}
            id={message.id}
            message={message.message}
            sender={message.sender}
            timestamp={formatTimeAgo(message.timestamp)}
          />
        ))
      )}
    </div>
  );
}
