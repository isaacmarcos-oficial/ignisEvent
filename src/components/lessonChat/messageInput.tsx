import { RefetchContext } from "@/Context/RefechContext";
import {
  CREATE_MESSAGE,
  EDIT_MESSAGE,
} from "@/graphql/queries/ead/ChatMessage";
import { ChatMessage } from "@/graphql/types/Ead/ChatMessage";
import { useMutation } from "@apollo/client";
import { Send } from "lucide-react";
import { useContext, useState } from "react";
import { toast } from "sonner";

export function MessageInput() {
  const context = useContext(RefetchContext);
  const [createChatMessage] = useMutation(CREATE_MESSAGE);
  const [message, setMessage] = useState("");
  const [userName, setUserName] = useState(() => localStorage.getItem("name") || "");
  const currentTime = new Date();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const messageData: Omit<ChatMessage, "id"> = {
      message: message,
      sender: userName,
      timestamp: String(currentTime),
    };

    try {
      await createChatMessage({
        variables: {
          createChatMessageObject: {
            ...messageData,
          },
        },
      });
      setMessage("");
      if (context && context.refetch) {
        context.refetch();
      }
    } catch (error) {
      toast.error("Erro ao enviar a mensagem. Tente novamente!");
    }
  };

  return (
    <form
      className="message-input border-gray-600 flex items-center"
      onSubmit={handleSubmit}
    >
      <input
        type="text"
        placeholder="Digite uma mensagem..."
        className="flex-1 bg-zinc-900 text-white p-2 pl-4 rounded-md outline-none"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <button
        type="submit"
        className="send-button ml-2 bg-green-500 hover:bg-green-700 text-white p-2 rounded-full"
        disabled={!message.trim()}
      >
        <Send className="h-5 w-5" />
      </button>
    </form>
  );
}
