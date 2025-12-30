import { useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import { Copy, Check } from "lucide-react";
import type { Message } from "../types";
import ClaudeLogo from "../assets/images/unli-claudelogo.webp";

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

  if (isUser) {
    // User message - pill style on right
    return (
      <div className="py-4 px-4 flex justify-end">
        <div className="max-w-3xl">
          <div className="inline-block bg-indigo-600 text-white px-4 py-3 rounded-2xl shadow-lg">
            <p className="text-sm whitespace-pre-wrap break-words leading-relaxed">
              {message.content}
            </p>
          </div>
        </div>
      </div>
    );
  }

  // Assistant message - full width with markdown
  return (
    <div className="py-6 px-4 bg-white">
      <div className="max-w-3xl mx-auto flex gap-4">
        {/* Avatar */}
        <div className="shrink-0 w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-sm font-medium text-white">
          <img src={ClaudeLogo} className="w-5 h-auto" alt="claude-logo" />
        </div>

        {/* Content with Markdown */}
        <div className="flex-1 min-w-0">
          <div className="text-sm font-medium text-gray-900 mb-2">Claude</div>
          <div className="prose prose-sm max-w-none prose-pre:p-0 prose-pre:m-0">
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              components={{
                code({ node, inline, className, children, ...props }) {
                  const match = /language-(\w+)/.exec(className || "");
                  const value = String(children).replace(/\n$/, "");

                  if (!inline && match) {
                    return <CodeBlock language={match[1]} value={value} />;
                  }

                  // Inline code
                  return (
                    <code
                      className="bg-gray-100 text-red-600 px-1.5 py-0.5 rounded text-sm font-mono"
                      {...props}
                    >
                      {children}
                    </code>
                  );
                },
                // Style other markdown elements
                p({ children }) {
                  return (
                    <p className="mb-4 last:mb-0 leading-relaxed text-gray-800">
                      {children}
                    </p>
                  );
                },
                ul({ children }) {
                  return (
                    <ul className="list-disc list-inside mb-4 space-y-1 text-gray-800">
                      {children}
                    </ul>
                  );
                },
                ol({ children }) {
                  return (
                    <ol className="list-decimal list-inside mb-4 space-y-1 text-gray-800">
                      {children}
                    </ol>
                  );
                },
                li({ children }) {
                  return <li className="text-gray-800">{children}</li>;
                },
                h1({ children }) {
                  return (
                    <h1 className="text-2xl font-bold mb-3 mt-6 text-gray-900">
                      {children}
                    </h1>
                  );
                },
                h2({ children }) {
                  return (
                    <h2 className="text-xl font-bold mb-3 mt-5 text-gray-900">
                      {children}
                    </h2>
                  );
                },
                h3({ children }) {
                  return (
                    <h3 className="text-lg font-semibold mb-2 mt-4 text-gray-900">
                      {children}
                    </h3>
                  );
                },
                blockquote({ children }) {
                  return (
                    <blockquote className="border-l-4 border-indigo-500 pl-4 py-2 my-4 italic text-gray-700 bg-gray-50">
                      {children}
                    </blockquote>
                  );
                },
                a({ children, href }) {
                  return (
                    <a
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-indigo-600 hover:text-indigo-700 underline"
                    >
                      {children}
                    </a>
                  );
                },
                table({ children }) {
                  return (
                    <div className="overflow-x-auto my-4">
                      <table className="min-w-full border border-gray-300">
                        {children}
                      </table>
                    </div>
                  );
                },
                thead({ children }) {
                  return <thead className="bg-gray-100">{children}</thead>;
                },
                th({ children }) {
                  return (
                    <th className="border border-gray-300 px-4 py-2 text-left font-semibold text-gray-900">
                      {children}
                    </th>
                  );
                },
                td({ children }) {
                  return (
                    <td className="border border-gray-300 px-4 py-2 text-gray-800">
                      {children}
                    </td>
                  );
                },
              }}
            >
              {message.content}
            </ReactMarkdown>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Message;
