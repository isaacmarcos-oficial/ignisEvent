import { Send } from "lucide-react";
import { useState } from "react";
import { io } from "socket.io-client";

export function MessageInput() {
  const [message, setMessage] = useState("");
  const [userName, _setUserName] = useState(
    () => localStorage.getItem("name") || ""
  );
  const currentTime = new Date();

  const socket = io("https://ignisdash-server.vercel.app/4001");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!message.trim()) return;

    socket.emit("sendMessage", {
      message: message,
      sender: userName,
      timestamp: String(currentTime),
    });

    setMessage("");
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
