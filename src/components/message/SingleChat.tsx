// @ts-nocheck
"use client";
import { useState } from "react";
import { Send, ArrowLeft } from "lucide-react";

const SingleChat = ({ selectedChat, onClose }) => {
    const [messages, setMessages] = useState(selectedChat.messages || []);
    const [input, setInput] = useState("");

    const handleSend = () => {
        if (input.trim()) {
            const newMessage = {
                text: input,
                sender: "You",
                time: new Date().toLocaleTimeString(),
            };
            setMessages([...messages, newMessage]);
            setInput("");
        }
    };

    return (
        <div className="flex flex-col h-screen w-[70%] border-l border-gray-200">

            <div className="flex items-center gap-2 p-4 bg-white border-b shadow-md">
                <button onClick={onClose} className="text-gray-600 hover:text-black">
                    <ArrowLeft size={20} />
                </button>
                <h2 className="text-lg text-primary font-semibold">{selectedChat.senderName}</h2>
            </div>


            <div className="flex-1 p-4 h-screen overflow-y-scroll bg-gray-50">
                {messages.map((msg, index) => (
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
                ))}
            </div>


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
                    className="ml-3 p-3 bg-primary text-white rounded-full hover:bg-blue-600"
                >
                    <Send size={20} />
                </button>
            </div>
        </div>
    );
};

export default SingleChat;
