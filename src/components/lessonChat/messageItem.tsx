import { ChevronRight } from "lucide-react";

export interface MessageProps {
  id: string;
  sender: string;
  message: string;
  timestamp: string;
}

export function MessageItem({ id, message, sender, timestamp }: MessageProps) {
  return (
    <div className="flex items-start space-x-3 p-1 mt-3" key={id}>
      <div className="text-sm rounded-lg">
        <div className="flex font-semibold  text-white items-center">
          <ChevronRight className="h5 w-5 text-green-500" />
          {sender}
          <p className="ml-2 text-zinc-700 text-xs">{timestamp}</p>
        </div>
        <div className=" text-gray-200">
          <p className="text-xs leading-5 tracking-[0.75px] ml-5">{message}</p>
        </div>
      </div>
    </div>
  );
}
