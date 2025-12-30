import React, { useState } from "react";
import { Menu } from "lucide-react";
import Sidebar from "./components/Sidebar";
import ChatArea from "./components/ChatArea";
import { ModelSelector } from "./components/ModelSelector";
import { chatWithClaude } from "./services/puterAI";
import type { Chat, Message, ClaudeModel } from "./types";

const App: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);
  const [selectedModel, setSelectedModel] =
    useState<ClaudeModel>("claude-sonnet-4-5");
  const [chats, setChats] = useState<Chat[]>([
    {
      id: "1",
      title: "Welcome Chat",
      preview: "How can I help you today?",
      messages: [],
      model: "claude-sonnet-4-5",
    },
  ]);
  const [currentChatId, setCurrentChatId] = useState<string>("1");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const currentChat = chats.find((chat) => chat.id === currentChatId);

  const handleSendMessage = async (content: string): Promise<void> => {
    const newMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content,
    };

    // Add user message
    setChats((prev) =>
      prev.map((chat) =>
        chat.id === currentChatId
          ? {
              ...chat,
              messages: [...chat.messages, newMessage],
              preview: content.slice(0, 50),
              model: selectedModel,
            }
          : chat
      )
    );

    setIsLoading(true);

    try {
      const aiMessageId = (Date.now() + 1).toString();
      let messageCreated = false;

      // Stream the response
      await chatWithClaude(content, selectedModel, (text: string) => {
        if (!messageCreated) {
          // Create the AI message only when we receive first content
          messageCreated = true;
          setIsLoading(false);

          const aiMessage: Message = {
            id: aiMessageId,
            role: "assistant",
            content: text,
          };

          setChats((prev) =>
            prev.map((chat) =>
              chat.id === currentChatId
                ? { ...chat, messages: [...chat.messages, aiMessage] }
                : chat
            )
          );
        } else {
          // Update existing message with new text
          setChats((prev) =>
            prev.map((chat) => {
              if (chat.id === currentChatId) {
                const updatedMessages = chat.messages.map((msg) =>
                  msg.id === aiMessageId
                    ? { ...msg, content: msg.content + text }
                    : msg
                );
                return { ...chat, messages: updatedMessages };
              }
              return chat;
            })
          );
        }
      });
    } catch (error) {
      console.error("Error sending message:", error);

      // Show error message
      const errorMessage: Message = {
        id: (Date.now() + 2).toString(),
        role: "assistant",
        content:
          "Sorry, there was an error processing your request. Please try again.",
      };

      setChats((prev) =>
        prev.map((chat) =>
          chat.id === currentChatId
            ? {
                ...chat,
                messages: [...chat.messages, errorMessage],
              }
            : chat
        )
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleNewChat = (): void => {
    const newChat: Chat = {
      id: Date.now().toString(),
      title: `Chat ${chats.length + 1}`,
      preview: "New conversation",
      messages: [],
      model: selectedModel,
    };
    setChats((prev) => [newChat, ...prev]);
    setCurrentChatId(newChat.id);
    setSidebarOpen(false);
  };

  const handleDeleteChat = (chatId: string): void => {
    if (chats.length === 1) return;
    setChats((prev) => prev.filter((chat) => chat.id !== chatId));
    if (currentChatId === chatId) {
      const remainingChat = chats.find((chat) => chat.id !== chatId);
      if (remainingChat) {
        setCurrentChatId(remainingChat.id);
      }
    }
  };

  const handleSelectChat = (id: string): void => {
    setCurrentChatId(id);
    setSidebarOpen(false);

    // Update selected model based on chat's model
    const chat = chats.find((c) => c.id === id);
    if (chat?.model) {
      setSelectedModel(chat.model as ClaudeModel);
    }
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <Sidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        chats={chats}
        currentChatId={currentChatId}
        onSelectChat={handleSelectChat}
        onNewChat={handleNewChat}
        onDeleteChat={handleDeleteChat}
      />

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Header */}
        <header className="bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden p-2 hover:bg-gray-100 rounded-lg"
            >
              <Menu className="w-5 h-5" />
            </button>
            <h1 className="text-lg font-semibold text-gray-900">
              {currentChat?.title || "Claude"}
            </h1>
          </div>

          {/* Model Selector */}
          <ModelSelector
            selectedModel={selectedModel}
            onSelectModel={setSelectedModel}
          />
        </header>

        {/* Chat */}
        <ChatArea
          messages={currentChat?.messages || []}
          onSendMessage={handleSendMessage}
          isLoading={isLoading}
        />
      </div>
    </div>
  );
};

export default App;
