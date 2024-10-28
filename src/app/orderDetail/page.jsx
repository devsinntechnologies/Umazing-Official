"use client"
import OrderCard from '@/components/order/OrderCard'
import Progress from '@/components/order/Progress'

const Page = () => {
  return (
    <div className='w-full min-h-[70vh] py-4 space-y-4'>
    <div className='w-full px-10'>
    <Progress currentStep={3}/>
    </div>
      <div className='flex justify-center'>
        <OrderCard />
      </div>
    </div>
    // </div>
  )
}

export default Page