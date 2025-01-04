import { LogOut, Menu, Search, X } from 'lucide-react'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuthStore } from '../store/authUser'
import { useContentStore } from '../store/content'

const Navbar = () => {

    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

    const {user,logout}=useAuthStore()

    const{setContentType}=useContentStore()
   

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen)

    }

  return (
    <header className='max-w-6xl mx-auto flex flex-wrap items-center justify-between p-4 h-20'>
      <div className='flex items-center gap-10 z-50'>
        <Link to='/' >
            <img src="/netflix-logo.png" alt="netflix-logo" className='hover:scale-105 transition w-32 md:w-40' />
        </Link>

        <div className='hidden sm:flex gap-2 items-center'>
            <Link to="/" className='hover:underline' onClick={()=>setContentType("movie")}>
            Movies
            </Link>     
            <Link to="/" className='hover:underline' onClick={()=>setContentType("tv")}>
            Tv Shows
            </Link>
            <Link to="/history" className='hover:underline'>
            Search History
            </Link>
        </div>
      </div>

        <div className='flex items-center z-10 gap-4'>
            <Link to="/search">
            <Search className='size-6 md:size-8 cursor-pointer'/>
            </Link>
            <img src={user.image} className='h-8 rounded cursor-pointer' alt="avator" />
            <LogOut className='size-6 md:size-8 cursor-pointer'onClick={logout} />

            <div className='sm:hidden '>
                {isMobileMenuOpen ? <X className='size-6 md:size-8 cursor-pointer' onClick={toggleMobileMenu}></X> : <Menu className='size-6 md:size-8 cursor-pointer' onClick={toggleMobileMenu}></Menu>}
            </div>
        </div>

       { isMobileMenuOpen && (
        <div className='sm:hidden w-full mt-4 z-50 bg-black rounded border border-gray-800 '>
            <Link to={"/"} 
            className='block hover:underline p-2'
            onClick={()=>setContentType("movie")}
            >Movies
            </Link>

            <Link to={"/"} 
            className='block hover:underline p-2'
            onClick={()=>setContentType("tv")}
            >Tv Shows
            </Link>

            <Link to={"/search"} 
            className='block hover:underline p-2'
            onClick={toggleMobileMenu}
            >Search History
            </Link>
        </div>)}
    </header>
  )
}

export default Navbar
