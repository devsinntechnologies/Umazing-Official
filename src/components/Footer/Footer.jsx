import React from 'react'
import FooterTopSection from './FooterTopSection'
import FooterMiddleSection from './FooterMiddleSection'
import FooterBottomSection from './FooterBottomSection'
const Footer = () => {
  return (
    <div className='w-full border-t border-gray-200'>
        {/* <FooterTopSection/> */}
        <FooterMiddleSection/>
        <FooterBottomSection/>
    </div>
  )
}

export default Footer