// @ts-nocheck
"use client";

import { useState, useEffect } from "react";
import { Send, ArrowLeft, MousePointerClick } from "lucide-react";
import { useParams, useRouter } from "next/navigation"; // Import useRouter
import allMessages from "@/data/message.json";

const SingleChat = ({ onClose }) => {
//   const senderId = useSelector((state: RootState) => state.authSlice?.user?.id);
    const { id } = useParams();
    const router = useRouter(); // Initialize useRouter

    // Filter selected chat based on ID
    const selectedChat = allMessages.find(chat => chat.id === Number(id));

    // State to manage messages and input
    const [messages, setMessages] = useState(selectedChat?.messages || []);
    const [input, setInput] = useState("");

    // Handle sending messages
    const handleSend = () => {
        if (input.trim()) {
            const newMessage = {
                text: input,
                sender: "You",
                time: new Date().toLocaleTimeString(),
            };
            setMessages([...messages, newMessage]);
            setInput(""); // Clear input field
        }
    };

    // Handle navigation back to sidebar
    const handleBack = () => {
        router.push("/messages/"); // Navigate back to sidebar page
    };

    return (
        <div className="flex flex-col w-full lg:w-[70%] md:w-[50%] flex-1 border-l border-gray-200">
            {/* Header Section */}
            <div className="flex items-center gap-2 p-4 bg-white border-b shadow-md">
                <button onClick={handleBack} className="text-gray-600 hover:text-black"> {/* Updated onClick */}
                    <ArrowLeft size={20} />
                </button>
                <h2 className="text-lg text-primary font-semibold">
                    {selectedChat?.senderName || "Unknown User"} {/* Fallback if senderName is missing */}
                </h2>
            </div>

            {/* Chat Messages Section */}
            <div className="flex-1 p-4 h-[calc(100vh-140px)] overflow-y-scroll bg-gray-50">
                {messages.length > 0 ? (
                    messages.map((msg, index) => (
                        <div
                            key={index}
                            className={`flex mb-3 ${msg.sender === "You" ? "justify-end" : "justify-start"}`}
                        >
                            <div
                                className={`p-3 rounded-lg shadow-md max-w-xs ${msg.sender === "You"
                                        ? "bg-primary text-white"
                                        : "bg-white text-primary"
                                    }`}
                            >
                                <p className="text-sm">{msg.text}</p>
                                <p className="text-xs text-gray-300 mt-1">{msg.time}</p>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="flex flex-col items-center justify-center text-gray-500 h-full">
                        <MousePointerClick size={48} />
                        <p className="text-lg mt-2">No messages yet. Start the conversation!</p>
                    </div>
                )}
            </div>

            {/* Input Box */}
            <div className="p-4 bg-white border-t flex items-center">
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Type a message..."
                    className="flex-1 p-3 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
                />
                <button
                    onClick={handleSend}
                    disabled={!input.trim()} // Disable button if input is empty
                    className={`ml-3 p-3 rounded-full ${input.trim() ? "bg-primary text-white hover:bg-primary" : "bg-gray-300"
                        }`}
                >
                    <Send size={20} />
                </button>
            </div>
        </div>
    );
};

export default SingleChat;
