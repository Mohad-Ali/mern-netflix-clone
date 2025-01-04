import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuthStore } from '../store/authUser'

const LoginPage = () => {

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const {login}=useAuthStore()

  const handleLogIn=(e)=>{
    e.preventDefault()
    login({email,password})
  }

  return (
    <div className='w-full h-screen hero-bg'>
      <header className='max-w-6xl mx-auto flex items-center justify-center p-4 -ml-44'>
        <Link to={"/"}>
        <img src="/netflix-logo.png" alt="logo" className='w-44' />
        </Link>
      </header>

      <div className='flex items-center justify-center mt-20 mx-3'>
        <div className='w-full max-w-md p-8 space-y-6 bg-black/60 rounded-lg shadow-md'>
         <h1 className=' text-2xl text-white text-center font-bold mb-6'>LogIn</h1>

         <form className='space-y-4' onSubmit={handleLogIn}>
          <div>
          <label className='text-sm font-medium text-gray-400 block' htmlFor="email">Email</label>
          <input id='email' type="email" placeholder='you@example.com' className='w-full px-3 py-2 mt-1 text-white rounded-md border border-gray-700 bg-transparent focus:outline-none focus:ring' value={email} onChange={(e)=>setEmail(e.target.value)} />
          </div>

          <div>
          <label className='text-sm font-medium text-gray-400 block' htmlFor="password">Password</label>
          <input id='password' type="password" placeholder='. . . . . . . . .' className='w-full px-3 py-2 mt-1 text-white rounded-md border border-gray-700 bg-transparent focus:outline-none focus:ring' value={password} onChange={(e)=>setPassword(e.target.value)}/>
          </div>

          <button className='w-full bg-red-600 text-white font-semibold py-2 rounded-md hover:bg-red-700'>login</button>
         </form>

        <div className='text-center text-gray-300'>
          Don't have an account? {" "}
          <Link to={"/signup"} className='text-red-500 hover:underline'>
          Sign up
          </Link>
        </div>
        </div>
      </div>
    </div>
  )
}

export default LoginPage
