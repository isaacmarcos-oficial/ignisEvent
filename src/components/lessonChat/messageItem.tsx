import { ChevronRight } from "lucide-react";

export interface Message {
  author: {
    name: string;
    avatar: string;
  };
  text: string;
  timestamp: string;
}

export interface MessageProps {
  message: Message;
}

export function MessageItem({ message }: MessageProps) {
  const { author, text, timestamp } = message;

  return (
    <div className="flex items-start space-x-3 p-1 mt-3 ">
      <div className="text-sm rounded-lg">
        <div className="flex font-semibold  text-white items-center">
          <ChevronRight className="h5 w-5 text-green-500" />
          {author.name}
          <p className="ml-2 text-zinc-700 text-xs">{timestamp}</p>
        </div>
        <div className=" text-gray-200">
          <p className="text-xs leading-5 tracking-[0.75px] ml-5">{text}</p>
        </div>
      </div>
    </div>
  );
}
