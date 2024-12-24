// @ts-nocheck
"use client";
import { ChevronDown, MousePointerClick } from "lucide-react";
import { useState } from "react";
import MsgHeader from "@/components/message/MsgHeader";
import MsgSearchbar from "@/components/message/MsgSearchBar";
import MsgContent from "@/components/message/MsgContent";
import messages from "@/data/message.json";
import SingleChat from "@/components/message/SingleChat";

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
    <div className="flex h-[70%]">
      <div className="relative w-[30%] h-screen">
        <div className="h-[calc(100vh-64px)] py-3 px-3 bg-gray-100 overflow-scroll">
          <MsgSearchbar />

          {/* Filter Buttons */}
          <div className="w-full flex items-center justify-start gap-3 py-3 text-xs">
            <button
              type="button"
              onClick={() => setFilter("All")}
              className={`rounded-full outline-none p-[2px] ${
                filter === "All"
                  ? "bg-primary text-white"
                  : "bg-white text-primary border"
              }`}
            >
              <div className="px-3 py-1 rounded-full">All</div>
            </button>

            <button
              type="button"
              onClick={() => setFilter("Seller")}
              className={`rounded-full outline-none p-[2px] ${
                filter === "Seller"
                  ? "bg-primary text-white"
                  : "bg-white text-primary border"
              }`}
            >
              <div className="px-3 py-1 rounded-full">Seller</div>
            </button>

            <button
              type="button"
              onClick={() => setFilter("Buyer")}
              className={`rounded-full outline-none p-[2px] ${
                filter === "Buyer"
                  ? "bg-primary text-white"
                  : "bg-white text-primary border"
              }`}
            >
              <div className="px-3 py-1 rounded-full">Buyer</div>
            </button>
          </div>

          {/* Display filtered messages */}
          <div className="flex gap-3 flex-col">
            {filteredMessages.map((message, index) => (
              <div key={index} onClick={() => setSelectedChat(message)}>
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
        <div className="flex flex-col w-[70%] items-center justify-center text-gray-500">
          <div>
            <MousePointerClick size={45} />
          </div>
          <div>Select a chat to start messaging</div>
        </div>
      )}
    </div>
  );
};

export default Messages;
