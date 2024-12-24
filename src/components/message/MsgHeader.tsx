import { MessageSquareText, Phone } from "lucide-react"

const Header = () => {
  return (
    <div className="absolute top-0 left-0 bg-white w-full h-16 shadow-xl flex item-center justify-end px-3">
      <div className="flex items-center justify-center gap-3" >
      <div className="w-8 h-8 flex items-center justify-center text-blue-600" >
          <MessageSquareText size={24}/>
        </div>
        <div className="w-8 h-8 flex items-center justify-center text-gray-400" >
          <Phone size={24} fill="#9ca3af"strokeWidth={0}/>
        </div>
      </div>
    </div>
  )
}

export default Header