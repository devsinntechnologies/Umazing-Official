import { Star } from 'lucide-react'
const Stars = ({rating}: {rating: number}) => {
  return (
    <div className="flex">
      {Array.from({length: 5}).map((_, index) => {
        return (
          <Star 
            key={index} 
            // size={12} 
            color="#FFFF00"
            fill={index < rating ? "#FFFF00" : "none"} 
            className='size-3 lg:size-4 xl:size-5'
          />
        )
      })}
    </div>
  )
}

export default Stars