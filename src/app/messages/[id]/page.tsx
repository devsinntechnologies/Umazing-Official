// @ts-nocheck
"use client";
import { useState, useEffect, useRef } from "react";
import { Send, ArrowLeft, MousePointerClick } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { getSocket } from "@/lib/socket";
import { MessageBox } from "react-chat-elements";
import { useFetchChatRoomQuery } from "@/hooks/useChat";
import "react-chat-elements/dist/main.css";

const SingleChat = () => {
    const { id } = useParams(); // Get the ID from the URL
    const { data: messagesData, isLoading, error } = useFetchChatRoomQuery(id);
    const router = useRouter();
    const senderId = useSelector((state: RootState) => state.authSlice?.user?.id);
    const socket = getSocket();

    // State management
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState("");
    const [receiver, setReceiver] = useState(null);
    const [typing, setTyping] = useState(false);

    // Reference to the message container to scroll to bottom
    const messagesEndRef = useRef(null);

    // Sync messages and receiver from fetched data
    useEffect(() => {
        if (messagesData) {
            setMessages(messagesData.data.messages || []);
            setReceiver(messagesData.data.receiver || null);
        }
    }, [messagesData]);

    // Mark messages as read
    useEffect(() => {
        if (messagesData?.data?.receiver?.id && senderId) {
            socket.emit("messageRead", { roomId: id });
        }
    }, [messagesData, senderId, id, socket]);

    // Listen for socket events
    useEffect(() => {
        socket.on("receiveMessage", ({ message }) => {
            if (message?.content && message?.timestamp) {
                setMessages((prev) => [...prev, message]);
            }
        });

        socket.on("typing", ({ roomId: typingRoomId, senderId: typingSenderId }) => {
            if (typingRoomId === id && typingSenderId !== senderId) {
                setTyping(true); // Other user is typing
            }
        });

        socket.on("stopTyping", ({ roomId: typingRoomId, senderId: typingSenderId }) => {
            if (typingRoomId === id && typingSenderId !== senderId) {
                setTyping(false); // Other user stopped typing
            }
        });

        return () => {
            socket.off("receiveMessage");
            socket.off("typing");
            socket.off("stopTyping");
        };
    }, [id, senderId, socket]);

    // Handle typing events
    const handleTyping = () => {
        if (!typing) {
            socket.emit("typing", { roomId: id }); // Emit typing event
        }
    };

    const handleStopTyping = () => {
        if (typing) {
            socket.emit("stopTyping", { roomId: id }); // Emit stop typing event
            setTyping(false);
        }
    };

    // Handle sending messages
    const handleSend = () => {
        if (input.trim()) {
            socket.emit("sendMessage", { roomId: id, senderId, receiverId: receiver?.id, content: input.trim() });
            setInput(""); // Clear input after sending
            handleStopTyping();
        }
    };

    const handleBack = () => {
        router.push("/messages/"); // Navigate back to sidebar page
    };

    // Scroll to the bottom whenever messages change
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    return (
        <div className="flex flex-col w-full lg:w-[70%] md:w-[50%] flex-1 border-l border-gray-200">
            {/* Header Section */}
            <div className="flex items-center gap-2 p-4 bg-white border-b shadow-md">
                <button onClick={handleBack} className="text-gray-600 hover:text-black">
                    <ArrowLeft size={20} />
                </button>
                <h2 className="text-lg text-primary font-semibold">
                    {receiver?.name || "Unknown User"}
                </h2>
            </div>

            {/* Chat Messages Section */}
            <div className="flex-1 p-4 h-[calc(100vh-140px)] overflow-y-scroll bg-gray-50">
                {isLoading ? (
                    <div className="text-center text-gray-500">Loading...</div>
                ) : error ? (
                    <div className="text-center text-red-500">Error loading messages</div>
                ) : messages.length > 0 ? (
                    messages.map((msg, index) => {
                        const isSender = msg.sender.id === senderId;
                        return (
                            <div key={index} className={`flex mb-3 ${isSender ? "justify-end" : "justify-start"}`}>
                                <MessageBox
                                    position={isSender ? "right" : "left"}
                                    text={msg.content}
                                    date={new Date(msg.timestamp)}
                                    type="text"
                                    className="text-sm"
                                    data={{
                                        style: {
                                            backgroundColor: isSender ? "#3B82F6" : "#F7985C", // Blue for sender, White for receiver
                                            color: isSender ? "#F7985C" : "#1E293B", // White text for sender, Dark Gray for receiver
                                            padding: "12px",
                                            borderRadius: "15px",
                                            maxWidth: "75%",
                                            boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
                                        },
                                    }}
                                />
                            </div>
                        );
                    })
                ) : (
                    <div className="flex flex-col items-center justify-center text-gray-500 h-full">
                        <MousePointerClick size={48} />
                        <p className="text-lg mt-2">No messages yet. Start the conversation!</p>
                    </div>
                )}

                {/* Typing indicator */}
                {typing && (
                    <div className="text-sm text-gray-500 mt-2">User is typing...</div>
                )}

                {/* Scroll target for messages */}
                <div ref={messagesEndRef} />
            </div>

            {/* Input Box */}
            <div className="p-4 bg-white sticky left-0 right-0 bottom-0 border-t flex items-center">
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleTyping} // Start typing on key down
                    onBlur={handleStopTyping} // Stop typing when the input loses focus
                    placeholder="Type a message..."
                    className="flex-1 p-3 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
                />
                <button 
                    onClick={handleSend}
                    disabled={!input.trim()}
                    className={`ml-3 p-3 rounded-full ${
                        input.trim() ? "bg-primary text-white hover:bg-primary" : "bg-gray-300"
                    }`}
                >
                    <Send size={20} />
                </button>
            </div>
        </div>
    );
};

export default SingleChat;

