import React from 'react'
import ChainLayer from '../common/ChainLayer'
import GradientButton from '../common/GradientButton'
import Image from 'next/image'

const Hero = () => {
  return (
    <div className='relative py-8'>
        <ChainLayer className="-left-24 rotate-180 top-10 opacity-20"/>
        <ChainLayer className="right-0 rotate-180 bottom-10 opacity-80 h-40 w-40" img="traingle.png"/>
        <div className='bg-white/10 backdrop-blur-sm min-h-[20rem] rounded-ss-2xl rounded-ee-2xl'>
            <div className='flex flex-wrap items-center p-10'>
                <div className='flex-1'>
                    <div className='text-white flex flex-col gap-2 justify-center'>
                    <h1 className='text-4xl'>Decentralized Bug Bountify Redefining Security</h1>
                    <p className='text-justify'>Welcome to our decentralized bug bounty platform, where innovation meets security. Our mission is to revolutionize the way vulnerabilities are discovered and resolved in the digital world. We believe in the power of the community, and that's why we've built a platform that empowers ethical hackers, developers, and security enthusiasts to collaborate seamlessly. With our platform, you can report and tackle security vulnerabilities in a transparent, decentralized, and rewarding manner.</p>
                    </div>
                    <div className='flex flex-row items-center justify-start py-4 gap-3'>
                        <GradientButton url="/about" title="About" className="bg-gradient-to-r from-btn_purple_l to-btn_purple_r px-9 py-2 rounded-br-2xl rounded-tl-2xl"/>
                        <GradientButton url="/login" title="Login" className="bg-gradient-to-r from-btn_purple_l to-btn_purple_r px-9 py-2 rounded-bl-2xl rounded-tr-2xl"/>
                    </div>
                </div>
                <div className='flex-1 flex justify-end'>
                    <Image src="/images/undraw_hacker_mind.svg" alt="hero" width={500} height={500} />
                </div>
            </div>
        </div>
    </div>
  )
}

export default Hero