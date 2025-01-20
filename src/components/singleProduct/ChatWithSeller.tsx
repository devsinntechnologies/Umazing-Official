import React from 'react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"

const ChatWithSeller = () => {
    return (

        <div className="flex justify-between w-full">
            <div className='w-[50%]'>
                <h1 className="font-semibold text-md">Seller Information</h1>
                <p className="text-[14px]">Seller: <span className="text-[#808080] font-normal">Umazing</span></p>
                {/* <p className="text-[14px]">Location: <span className="text-[#808080] font-normal">Lagos, Nigeria</span></p> */}
                <p className="text-[14px]">Phone: <span className="text-[#808080] font-normal">+234 812 345 6789</span></p>
                <p className="text-[14px]">Email: <span className="text-[#808080] font-normal"></span></p>
            </div>
            <div className='w-[50%]'>
            <Dialog>
                <DialogTrigger> <button
                // onClick={handleCheckout}
                // disabled={addingToCart}
                className="h-[51px] w-[20%] text-white font-bold text-sm lg:w-[50%] rounded-xl bg-primary">
                Chat with Seller
            </button></DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Start Chat with Seller</DialogTitle>
                        <DialogDescription>
                            This action cannot be undone. This will permanently delete your account
                            and remove your data from our servers.
                        </DialogDescription>
                    </DialogHeader>
                </DialogContent>
            </Dialog>
            </div>
          

        </div>

    )
}

export default ChatWithSeller