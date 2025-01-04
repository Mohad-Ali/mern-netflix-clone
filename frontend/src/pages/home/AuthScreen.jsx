import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ChevronRight } from 'lucide-react';


const AuthScreen = () => {
    const [email, setEmail] = useState("");
    const navigate = useNavigate();

    const handleSubmit=(e)=>{
        e.preventDefault()
        navigate("/signup?email=" + email)
      
    }

  return (
    <div className='hero-bg relative'>
        <header className='max-w-6xl mx-auto flex items-center justify-between p-4 pb-10'>
            <img src="/netflix-logo.png" alt="logo" className='w-32 md:w-52 hover:scale-105 transition' />
            <Link to={"/login"} className='bg-red-600 px-2 py-1 text-white rounded '>Sign In</Link>
        </header>
     
     <div className='flex flex-col items-center justify-center text-center py-40 text-white max-w-6xl mx-auto'>
        <h1 className='text-4xl md:text-6xl font-bold mb-4'>Unlimited movies, Tv shows and more</h1>
        <p className='text-lg mb-4'>Watch anywhere. Cancle anytime</p>
        <p className='mb-4'>Ready to watch? Enter your email to create or restart your membership</p>

        <form onSubmit={handleSubmit} className='flex flex-col md:flex-row gap-4 w-1/2'>
            <input type="email" placeholder='Email address' className='p-2 flex-1 bg-black/80 rounded border border-gray-500' value={email} onChange={(e)=>setEmail(e.target.value)}/>
            <button className='text-xl lg:text-2xl px-2 lg:px-6 py-1 md:py-2 rounded bg-red-600 text-white flex items-center justify-center'>Get Started
            <ChevronRight className='size-8 md:size-10'/>
            </button>
        </form>
     </div>

    <div className='h-2 w-full bg-[#232323]' aria-hidden="true"/>
    
    <div className='py-10 bg-black text-white'>
      <div className='flex max-w-6xl mx-auto items-center justify-center md:flex-row flex-col px-4 md:px-2'>
        <div className='flex-1 text-center md:text-left'>
           <h2 className='text-4xl md:text-5xl font-extrabold mb-10'>Enjoy on your tv</h2>
          <p className='text-lg md:text-xl'>Watch on smart tvs, playstation, Xbox, chromecast, Apple tv, blue-ray player and more </p>
        </div>
        <div className='flex-1 relative'>
          <img src="/tv.png" alt="tv image" className='mt-4 z-20 relative'/>
          <video src="/hero-vid.m4v" type="video/mp4" className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-1/2 ' loop muted autoPlay={true} ></video>
        </div>
      </div>

    </div>

    <div className='h-2 w-full bg-[#232323]' aria-hidden="true"/>

    <div className='py-10 bg-black text-white'>
      <div className='flex max-w-6xl mx-auto items-center justify-center flex-col-reverse md:flex-row px-4 md:px-2'>
        <div className='flex-1'>
          <div className='relative'>
            <img src="/stranger-things-lg.png" alt="image" className='mt-4' />

            <div className='flex items-center gap-2 absolute bottom-5 left-1/2 -translate-x-1/2 bg-black w-3/4 lg:w-1/2 h-24 border border-slate-500 rounded-md px-2'>
              <img src="/stranger-things-sm.png" alt="image" className='h-full ' />

              <div className='flex justify-between items-center w-full'>
                <div className='flex flex-col gap-0'>
                    <span className='text-md lg:text-lg font-bold '>Stranger things</span>
                    <span className='text-sm text-blue-500'>Downloading...</span>
                </div>
                  <img src="/download-icon.gif" alt="" className='h-12' />
              </div>

            </div>
          </div>

        </div>
        <div className='flex-1 text-center md:text-left'>
            <h2 className=' text-4xl md:text-5xl mb-4 font-extrabold text-balance'>Download your shows to watch offline</h2>
            <p className='text-lg md:text-xl'>save your favorites easily and always have somthing to watch</p>
        </div>
      </div>
    </div>

    <div className='h-2 w-full bg-[#232323]' aria-hidden="true"/>

    <div className='py-10 bg-black text-white'>
      <div className='flex max-w-6xl mx-auto items-center justify-center flex-col md:flex-row px-4 md:px-2 '>

        <div className='flex-1 text-center md:text-left'>
          <h2 className='text-4xl md:text-5xl font-extrabold mb-4'>Watch everywhere</h2>
          <p className='text-lg md:text-xl'>Stream unlimited movies and Tv shows on your phone, tablet, laptop and TV</p>
        </div>

        <div className='flex-1 relative overflow-hidden'>
          <img src="/device-pile.png" alt="" className='mt-4 z-20 relative'/>
          <video loop autoPlay={true} muted playsInline className='absolute top-2 left-1/2 -translate-x-1/2  h-4/6 z-10 max-w-[63%]'>
          <source src="/video-devices.m4v" type='video/mp4'  />
          </video>
        </div>
      </div>
    </div>

    <div className='h-2 w-full bg-[#232323]' aria-hidden="true"/>

    <div className='py-10 bg-black text-white'>
      <div className='flex max-w-6xl mx-auto items-center justify-center flex-col-reverse md:flex-row px-4 md:px-2'>

        <div className='flex-1 relative'>
          <img src="/kids.png" alt="kid image" className='mt-4'  />
        </div>

        <div className='flex-1 text-center md:text-left '>
          <h2 className='text-4xl md:text-5xl font-extrabold mb-4 '>Create profile for kids</h2>
          <p className='text-lg md:text-xl'>send kid on adventures with their favorite characters in a space made just for them-free with your membership</p>
        </div>
      </div>
    </div>
    </div>
  )
}

export default AuthScreen
