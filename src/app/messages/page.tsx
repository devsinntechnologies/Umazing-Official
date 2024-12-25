// @ts-nocheck
"use client";
import { ChevronDown, MousePointerClick } from "lucide-react";
import { useState } from "react";
import MsgHeader from "@/components/message/MsgHeader";
import MsgSearchbar from "@/components/message/MsgSearchBar";
import MsgContent from "@/components/message/MsgContent";
import messages from "@/data/message.json";
import SingleChat from "@/components/message/SingleChat";
import { Button } from "@/components/ui/button";

const Messages = () => {
  const [selectedChat, setSelectedChat] = useState(null);

  // Filter state
  const [filter, setFilter] = useState("All"); // Default filter is "All"

  // Filter messages based on the selected filter
  const filteredMessages = messages.filter((message) => {
    if (filter === "All") return true; // Show all messages
    return message.type.toLowerCase() === filter.toLowerCase(); // Match by type
  });

  return (
    <div className="flex w-full h-[calc(100vh-80px)]">
      <div className="relative w-[400px] h-full bg-gray-50 border-r">
        <div className="h-full py-4 px-4 overflow-y-auto">
          <MsgSearchbar />

          {/* Filter Buttons */}
          <div className="w-full flex items-center justify-start gap-3 py-4 text-sm">
            {["All", "Seller", "Buyer"].map((type) => (
              <Button
                key={type}
                type="button"
                onClick={() => setFilter(type)}
                className={`transition-all duration-200 ${
                  filter === type
                    ? "bg-primary text-white"
                    : "bg-white text-primary border border-primary"
                }`}
              >
                {type}
              </Button>
            ))}
          </div>

          {/* Display filtered messages */}
          <div className="space-y-3">
            {filteredMessages.map((message, index) => (
              <div
                key={index}
                onClick={() => setSelectedChat(message)}
                className="cursor-pointer hover:bg-gray-200 p-2 rounded-lg transition-all"
              >
                <MsgContent {...message} />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Chat Content */}
      {selectedChat ? (
        <SingleChat
          selectedChat={selectedChat}
          onClose={() => setSelectedChat(null)}
        />
      ) : (
        <div className="flex flex-col flex-1 items-center justify-center text-gray-500">
          <MousePointerClick size={48} />
          <p className="text-lg mt-2">Select a chat to start messaging</p>
        </div>
      )}
    </div>
  );
};

export default Messages;
