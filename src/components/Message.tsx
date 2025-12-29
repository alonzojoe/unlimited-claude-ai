import type { Message } from "../types";

interface MessageProps {
  message: Message;
}

const Message = ({ message }: MessageProps) => {
  const isUser = message.role === "user";

  return (
    <div className={`py-6 px-4 ${isUser ? "bg-gray-50" : "bg-white"}`}>
      <div className="max-w-3xl mx-auto flex gap-4">
        {/* Avatar */}
        <div
          className={`shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-sm ${
            isUser
              ? "bg-indigo-600 text-white"
              : "bg-linear-to-br from-orange-400 to-pink-500 text-white"
          }`}
        >
          {isUser ? "U" : "C"}
        </div>
        {/* Avatar */}

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="text-sm font-medium text-gray-900 mb-1">
            {isUser ? "You" : "Claude"}
          </div>
          <div className="text-gray-800 whitespace-pre-wrap wrap-break-word leading-relaxed">
            {message.content}
          </div>
        </div>
        {/* Content */}
      </div>
    </div>
  );
};

export default Message;
