import { ChatCircle } from "phosphor-react";

export function ChatHeader() {
  return (
    <div className="flex items-center justify-between">
      <div className="justify-center font-bold flex items-center">
        <ChatCircle className="h-6 w-6 text-green-500" />
        <h1 className=" font-semibold text-white ml-2">Live Chat</h1>
      </div>
    </div>
  );
}
