import { useMemo, useState } from "react";
import { ChatHeader } from "./chatHeader";
import { MessageInput } from "./messageInput";
import { MessageList } from "./messageList";
import { RefetchContext } from "@/Context/RefechContext";

export function LiveChat() {
  const [refetchFunction, setRefetchFunction] = useState<() => void>(
    () => () => {}
  );

  const contextValue = useMemo(
    () => ({
      refetch: refetchFunction,
      setRefetchFunction,
    }),
    [refetchFunction]
  );

  return (
    <div className="min-h-[350px] border space-y-3 border-zinc-800 rounded p-4 overflow-hidden">
      <RefetchContext.Provider value={contextValue}>
        <ChatHeader />
        <MessageList />
        <MessageInput />
      </RefetchContext.Provider>
    </div>
  );
}
