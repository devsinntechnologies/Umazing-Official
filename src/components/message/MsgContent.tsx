// @ts-nocheck
"use client"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

const Message = ({ senderInitials, senderName, messageContent, timestamp, unreadMessages, type }) => {
  return (
    <div className='rounded-xl w-full h-20 justify-center bg-white border border-primary shadow-lg py-2 px-2 grid grid-cols-6 gap-2 items-center'>
     
      <Avatar>
        <AvatarImage className='w-8 h-8 text-sm bg-gradient-to-t to-gradientTo from-gradientFrom'>
          {senderInitials}
        </AvatarImage>
        <AvatarFallback>{senderInitials}</AvatarFallback>
      </Avatar>

      {/* Message details */}
      <div className='col-span-4 text-[10px] h-fit '> 
       <div className="flex gap-1"> 
        <h1 className="font-extrabold text-primary text-base">{senderName} </h1>
       <h1 className="font-semibold text-primary text-base"> ({type})</h1>
       </div>
        <h2 className="text-primary text-sm">
          {messageContent.length > 29 ? `${messageContent.substring(0, 28)}...` : messageContent}
        </h2>
      </div>

      {/* Timestamp and unread messages */}
      <div className='flex items-center justify-center gap-1 flex-col text-primary font-bold text-center text-xs'>
        <h1>{timestamp}</h1>
         <div className='p-1 size-6 text-white bg-primary rounded-full'>{unreadMessages}</div>
      </div>
    </div>
  );
};

export default Message;
