import { Star } from 'lucide-react'
const Stars = () => {
  return (
    <div className="flex">
      {Array.from({length: 5}).map((_, index)=>{
        return <Star key={index} size={12} color="#4D4D4D" />})
      }
  </div>
  )
}

export default Stars