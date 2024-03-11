import { Send } from "lucide-react";
import { useState } from "react";

type SendMessageFunction = (messageText: string) => void;

export function MessageInput({onSendMessage}: { onSendMessage: SendMessageFunction }) {
  const [message, setMessage] = useState('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (message.trim()) {
      onSendMessage(message);
      setMessage('');
    }
  };

  return (
    <form className="message-input border-gray-600 flex items-center" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Digite uma mensagem..."
        className="flex-1 bg-zinc-900 text-white p-2 rounded-md outline-none"
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
  )
}