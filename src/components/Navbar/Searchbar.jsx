import { Search } from 'lucide-react'
import React from 'react'

const Searchbar = () => {
  return (
    <div className="items-center flex w-full md:w-1/2 bg-gray-100 rounded-full overflow-hidden">
            <input
              type="text"
              placeholder="Search"
              className="w-full px-4 py-2 text-sm border-none outline-none bg-transparent"
            />
            <button className="bg-primary text-white px-4 py-2">
              <Search/>
            </button>
          </div>
  )
}

export default Searchbar
