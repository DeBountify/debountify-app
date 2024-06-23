import MainFooter from '@/components/common/MainFooter'
import About from '@/components/landing_page/About'
import React from 'react'

const page = () => {
  return (
    <div>
        <About />
        <div className='py-4'>
        <MainFooter />
        </div>
    </div>
  )
}

export default page