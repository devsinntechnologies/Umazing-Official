// @ts-nocheck
"use client";
import React, { useState } from "react";
import { Search } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import messages from "@/data/message.json";
import { useRouter, useParams } from "next/navigation";

const Messages = () => {
  const { id } = useParams(); // Get the message id from the URL
  const [filter, setFilter] = useState("All"); // Default filter is "All"

  // Convert the id from the URL to a number (if it's a valid number)
  const activeId = id ? parseInt(id, 10) : null;

  // Filter messages based on the selected filter
  const filteredMessages = messages.filter((message) => {
    if (filter === "All") return true; // Show all messages
    return message.type.toLowerCase() === filter.toLowerCase(); // Match by type
  });

  return (
    <MessageSideBar
      messages={filteredMessages}
      setFilter={setFilter}
      filter={filter}
      activeId={activeId} // Pass active id to MessageSideBar
    />
  );
};

const MessageSideBar = ({ messages, setFilter, filter, activeId }) => {
  const router = useRouter();

  return (
    <div className="relative w-[400px] h-full bg-gray-50 border-r">
      <div className="h-full py-4 px-4 overflow-y-auto">
        <div className="w-full h-10 overflow-hidden bg-white m-auto flex items-center shadow-xl border-darkGrey rounded-full pr-2 pl-4">
          <div className="w-6 sm:w-8">
            <Search size={20} className="text-darkGrey" />
          </div>
          <input
            type="text"
            placeholder="Search Products"
            className="w-full outline-none bg-transparent border-0 h-full px-2 text-darkGrey text-xs"
          />
        </div>

        {/* Filter Buttons */}
        <div className="w-full flex items-center justify-start gap-3 py-4 text-sm">
          {["All", "Seller", "Buyer"].map((type) => (
            <button
              key={type}
              onClick={() => setFilter(type)}
              className={`transition-all duration-200 ${
                filter === type
                  ? "bg-primary rounded-full px-3 py-1 font-bold text-white"
                  : " text-primary font-bold "
              }`}
            >
              {type}
            </button>
          ))}
        </div>

        {/* Display filtered messages */}
        <div className="space-y-1">
          {messages.map((message) => (
            <div
             
            
            >
              <div 
              onClick={() => router.push(`${message.id}`)}
              key={message.id}
              className={`cursor-pointer p-2 rounded-lg transition-all rounded-xl w-full h-20 justify-center bg-white border border-primary hover:shadow-lg py-2 px-2 grid grid-cols-6  items-center ${
                activeId === message.id
                  ? "border-4 " // Highlight active card with blue border
                  : ""
              }`}>
                {/* Avatar */}
                <Avatar>
                  <AvatarImage
                    src=""
                    alt={message.senderInitials}
                    className="w-8 h-8 text-sm bg-gradient-to-t to-gradientTo from-gradientFrom"
                  />
                  <AvatarFallback>{message.senderInitials}</AvatarFallback>
                </Avatar>

                {/* Message details */}
                <div className="col-span-4 text-[10px] h-fit">
                  <div className="flex gap-1">
                    <h1 className="font-extrabold text-primary text-base">
                      {message.senderName}
                    </h1>
                    <h1 className="font-semibold text-primary text-base">
                      ({message.type})
                    </h1>
                  </div>
                  <h2 className="text-primary text-sm">
                    {message.messageContent.length > 29
                      ? `${message.messageContent.substring(0, 28)}...`
                      : message.messageContent}
                  </h2>
                </div>

                {/* Timestamp and unread messages */}
                <div className="flex items-center justify-center gap-1 flex-col text-primary font-bold text-center text-xs">
                  <h1>{message.timestamp}</h1>
                  {message.unreadMessages > 0 && (
                    <div className="p-1 size-6 text-white bg-primary rounded-full">
                      {message.unreadMessages}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Messages;
