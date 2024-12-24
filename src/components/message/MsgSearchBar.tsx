import { Search } from "lucide-react"


const searchbar = () => {
  return (
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
  )
}

export default searchbar