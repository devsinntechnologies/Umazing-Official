"use client"
import OrderCard from '@/components/order/OrderCard'
import Progress from '@/components/order/Progress'

const Page = () => {
  return (
    <div className='w-full min-h-[70vh] py-10  space-y-10'>
    <div className='w-full md:px-10 px-5 px-2'>
    <Progress currentStep={3}/>
    </div>
      <div className='flex justify-center '>
        <OrderCard />
      </div>
    </div>
    // </div>
  )
}

export default Page