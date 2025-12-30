import { useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import { Copy, Check } from "lucide-react";
import type { Message } from "../types";

interface CodeBlockProps {
  language: string;
  value: string;
}

const CodeBlock = ({ language, value }: CodeBlockProps) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(value);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative group my-4">
      <div className="flex items-center justify-between bg-gray-800 text-gray-300 px-4 py-2 text-xs rounded-t-lg">
        <span className="font-medium">{language}</span>
        <button
          onClick={handleCopy}
          className="flex items-center gap-1.5 px-2 py-1 hover:bg-gray-700 rounded transition-colors"
        >
          {copied ? (
            <>
              <Check className="w-3.5 h-3.5" />
              <span>Copied!</span>
            </>
          ) : (
            <>
              <Copy className="w-3.5 h-3.5" />
              <span>Copy</span>
            </>
          )}
        </button>
      </div>
      <SyntaxHighlighter
        language={language}
        style={oneDark}
        customStyle={{
          margin: 0,
          borderTopLeftRadius: 0,
          borderTopRightRadius: 0,
          borderBottomLeftRadius: "0.5rem",
          borderBottomRightRadius: "0.5rem",
        }}
        PreTag="div"
      >
        {value}
      </SyntaxHighlighter>
    </div>
  );
};

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
          className={`shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
            isUser
              ? "bg-indigo-600 text-white"
              : "bg-gradient-to-br from-orange-400 to-pink-500 text-white"
          }`}
        >
          {isUser ? "U" : "C"}
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="text-sm font-medium text-gray-900 mb-1">
            {isUser ? "You" : "Claude"}
          </div>
          <div className="text-gray-800 whitespace-pre-wrap break-words leading-relaxed">
            {message.content}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Message;
