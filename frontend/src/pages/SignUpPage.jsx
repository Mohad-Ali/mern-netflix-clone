import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuthStore } from '../store/authUser'

const SignUpPage = () => {

  const {searchParams} = new URL(document.location) //navigate
  const emailValue = searchParams.get("email")
 
  const [email, setEmail] = useState(emailValue || "")
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

  const {signup} = useAuthStore() //zustand

  const handleSignup=(e)=>{
    e.preventDefault()
    signup({email,username,password})
    // setEmail("")
    // setUsername("")
    // setPassword("")
   
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
         <h1 className=' text-2xl text-white text-center font-bold mb-6'>Signup</h1>

         <form className='space-y-4' onSubmit={handleSignup}>
          <div>
          <label className='text-sm font-medium text-gray-400 block' htmlFor="email">Email</label>
          <input id='email' type="email" placeholder='you@example.com' className='w-full px-3 py-2 mt-1 text-white rounded-md border border-gray-700 bg-transparent focus:outline-none focus:ring' value={email} onChange={(e)=>setEmail(e.target.value)} />
          </div>

          <div>
          <label className='text-sm font-medium text-gray-400 block' htmlFor="username">Username</label>
          <input id='username' type="text" placeholder='mohammed' className='w-full px-3 py-2 mt-1 text-white rounded-md border border-gray-700 bg-transparent focus:outline-none focus:ring' value={username} onChange={(e)=>setUsername(e.target.value)}/>
          </div>

          <div>
          <label className='text-sm font-medium text-gray-400 block' htmlFor="password">Password</label>
          <input id='password' type="password" placeholder='. . . . . . . . .' className='w-full px-3 py-2 mt-1 text-white rounded-md border border-gray-700 bg-transparent focus:outline-none focus:ring' value={password} onChange={(e)=>setPassword(e.target.value)}/>
          </div>

          <button className='w-full bg-red-600 text-white font-semibold py-2 rounded-md hover:bg-red-700'>signup</button>
         </form>

        <div className='text-center text-gray-300'>
          Already a member? {" "}
          <Link to={"/login"} className='text-red-500 hover:underline'>
          Sign in
          </Link>
        </div>
        </div>
      </div>
    </div>
  )
}

export default SignUpPage
