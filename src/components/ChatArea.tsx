import { useRef, useEffect } from "react";
import type { Message as IMessage } from "../types";
import Message from "./Message";
import ChatInput from "./ChatInput";
import { MessageSquare } from "lucide-react";

interface ChatAreaProps {
  messages: IMessage[];
  onSendMessage: (message: string) => void;
  isLoading: boolean;
}

const ChatArea = ({ messages, onSendMessage, isLoading }: ChatAreaProps) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);
  return (
    <div className="flex flex-col h-full">
      {/* Messages */}
      <div className="flex-1 overflow-y-auto">
        {messages.length === 0 ? (
          <div className="h-full flex items-center justify-center">
            <div className="text-center max-w-md px-4">
              <div className="w-16 h-16 bg-linear-to-br from-orange-400 to-pink-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <MessageSquare className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Start a conversation
              </h3>
              <p className="text-gray-600">
                Ask me anything. I'm here to help with questions, ideas, and
                tasks.
              </p>
            </div>
          </div>
        ) : (
          <>
            {messages.map((message) => (
              <Message key={message.id} message={message} />
            ))}
            {isLoading && (
              <div className="py-6 px-4 bg-white">
                <div className="max-w-3xl mx-auto flex gap-4">
                  <div className="shrink-0 w-8 h-8 rounded-full bg-linear-to-br from-orange-400 to-pink-500 flex items-center justify-center text-sm font-medium text-white">
                    C
                  </div>
                  <div className="flex-1">
                    <div className="text-sm font-medium text-gray-900 mb-1">
                      Claude
                    </div>
                    <div className="flex gap-1">
                      <div
                        className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                        style={{ animationDelay: "0ms" }}
                      />
                      <div
                        className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                        style={{ animationDelay: "150ms" }}
                      />
                      <div
                        className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                        style={{ animationDelay: "300ms" }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </>
        )}
      </div>

      {/* Input */}
      <ChatInput onSend={onSendMessage} disabled={isLoading} />
    </div>
  );
};

export default ChatArea;
