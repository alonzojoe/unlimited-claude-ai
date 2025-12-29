import { useState } from "react";
import ChatArea from "./components/ChatArea";
import type { Chat, Message } from "./types";
import { Menu } from "lucide-react";
import Sidebar from "./components/Sidebar";

const App = () => {
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);
  const [chats, setChats] = useState<Chat[]>([
    {
      id: "1",
      title: "Welcome Chat",
      preview: "How can I help you today?",
      messages: [],
    },
  ]);
  const [currentChatId, setCurrentChatId] = useState<string>("1");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const currentChat = chats.find((chat) => chat.id === currentChatId);

  const handleSendMessage = (content: string): void => {
    const newMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content,
    };

    setChats((prev) =>
      prev.map((chat) =>
        chat.id === currentChatId
          ? {
              ...chat,
              messages: [...chat.messages, newMessage], // Changed from 'message' to 'messages'
              preview: content.slice(0, 50),
            }
          : chat
      )
    );

    // Simulate AI response
    setIsLoading(true);
    setTimeout(() => {
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content:
          "I'm a demo UI. In a real application, this would be Claude's response to your message!",
      };

      setChats((prev) =>
        prev.map((chat) =>
          chat.id === currentChatId
            ? { ...chat, messages: [...chat.messages, aiMessage] }
            : chat
        )
      );
      setIsLoading(false);
    }, 1000);
  };

  const handleNewChat = (): void => {
    const newChat: Chat = {
      id: Date.now().toString(),
      title: `Chat ${chats.length + 1}`,
      preview: "New conversation",
      messages: [],
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

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <Sidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        chats={chats}
        currentChatId={currentChatId}
        onSelectChat={(id: string) => {
          setCurrentChatId(id);
          setSidebarOpen(false);
        }}
        onNewChat={handleNewChat}
        onDeleteChat={handleDeleteChat}
      />

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Header */}
        <header className="bg-white border-b border-gray-200 px-4 py-3 flex items-center gap-3">
          <button
            onClick={() => setSidebarOpen(true)}
            className="lg:hidden p-2 hover:bg-gray-100 rounded-lg"
          >
            <Menu className="w-5 h-5" />
          </button>
          <h1 className="text-lg font-semibold text-gray-900">
            {currentChat?.title || "Claude"}
          </h1>
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
