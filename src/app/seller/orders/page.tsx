"use client"
import withAuth from '@/components/hoc/withAuth'
import CancelOrder from '@/components/order/CancelOrder'
import OrderCard from '@/components/order/OrderCard'
import Progress from '@/components/order/Progress'

const Page = () => {
  return (
    <div className='w-full min-h-[70vh] py-10  space-y-10'>
    <div className='w-full md:px-10 px-5'>
    <Progress currentStep={3}/>
    </div>
    <div className='flex justify-between'>
        <div></div>
        <CancelOrder/>
    </div>
      <div className='flex justify-center '>
        <OrderCard />
      </div>
    </div>
  )
}

export default withAuth(Page)