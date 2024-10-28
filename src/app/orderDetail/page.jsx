"use client"
import OrderCard from '@/components/order/OrderCard'
import React from 'react'

const page = () => {
  return (
    <div className='flex flex-col justify-center my-5 '>
        <div className="timeline flex justify-around py-5">
            <div className="timeline-item">
                <div className="timeline-dot"></div>
                <div className="timeline-content">
                    <h3 className="timeline-title">Order Placed</h3>
                    <p className="timeline-date">12 May 2023</p>
                </div>
            </div>

            <div className="timeline-item">
                <div className="timeline-dot"></div>
                <div className="timeline-content">
                    <h3 className="timeline-title">Sewing</h3>
                    <p className="timeline-date">12 May 2023</p>
                </div>
            </div>

            <div className="timeline-item">
                <div className="timeline-dot"></div>
                <div className="timeline-content">
                    <h3 className="timeline-title">Out of Delivery</h3>
                    <p className="timeline-date">12 May 2023</p>
                </div>
            </div>

            <div className="timeline-item">
                <div className="timeline-dot"></div>
                <div className="timeline-content">
                    <h3 className="timeline-title">Success</h3>
                    <p className="timeline-date">12 May 2023</p>
                </div>
            </div>
        </div>
<div className='flex justify-center'>
<OrderCard /> 
</div>

    </div>
  )
}

export default page