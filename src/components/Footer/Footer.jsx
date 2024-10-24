import React from 'react'
import FooterTopSection from './FooterTopSection'
import FooterMiddleSection from './FooterMiddleSection'
import FooterBottomSection from './FooterBottomSection'
const Footer = () => {
  return (
    <div className='border-t border-solid-2px'>
        {/* <FooterTopSection/> */}
        <FooterMiddleSection/>
        <FooterBottomSection/>
    </div>
  )
}

export default Footer