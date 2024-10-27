import React from 'react'
import FooterTopSection from './FooterTopSection'
import FooterMiddleSection from './FooterMiddleSection'
import FooterBottomSection from './FooterBottomSection'
const Footer = () => {
  return (
    <div className='w-full border-t border-gray-200 px-2 sm:px-4 md:px-6 lg:px-8'>
        {/* <FooterTopSection/> */}
        <FooterMiddleSection/>
        <FooterBottomSection/>
    </div>
  )
}

export default Footer