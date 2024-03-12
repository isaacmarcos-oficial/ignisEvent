import { useQuery } from "@apollo/client";
import { Logo } from "./Logo";
import { ChatMessage } from "@/graphql/types/Ead/ChatMessage";
import { GET_CHAT_MESSAGES } from "@/graphql/queries/ead/ChatMessage";

export function Header() {
  return (
    <header className="w-full py-5 flex items-center justify-center bg-gray-700 border-b border-gray-600">
      <img className="h-10" src="/src/assets/serIgnis.png" alt="" />
    </header>
  );
}
