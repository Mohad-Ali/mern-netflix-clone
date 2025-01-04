import React, { useState } from 'react'
import { useContentStore } from '../store/content'
import Navbar from '../components/Navbar'
import { Search } from 'lucide-react'
import axios from 'axios'
import toast from 'react-hot-toast'
import { ORIGINAL_IMG_BASE_URL } from '../utils/constant'
import { Link } from 'react-router-dom'

const SearchPage = () => {
    const [activeTab, setActiveTab] = useState("movie")
    const [searchTerm, setSearchTerm] = useState("")
    const [results, setResults] = useState([])

   const {setContentType} = useContentStore()

const handleTabclick = (tab) => {
    setActiveTab(tab)
    tab === "movie" ? setContentType("movie") : tab === "tv" ? setContentType("tv") : setContentType("person")
    setResults([])
}

const handleSearch = async(e) => {
    e.preventDefault()
    try {
        const response = await axios.get(`/api/v1/search/${activeTab}/${searchTerm}`)
        setResults(response.data.content)
    } catch (error) {
        if(error.response.status === 404){
            toast.error("No result found enter a valid search term")
        }else{
            toast.error("An error occured, please try again later")
        } 
    }
}

  return (
    <div className='min-h-screen text-white bg-black'>
        <Navbar/>
        <div className='container mx-auto px-4 py-8'>

        <div className='flex justify-center gap-4 mb-4'>
            <button className={`px-4 py-2 rounded-lg cursor-pointer hover:bg-red-700 ${activeTab === "movie" ? "bg-red-600" :"bg-gray-800"}`}
             onClick={()=>handleTabclick("movie")}>Movies</button>
            <button className={`px-4 py-2 rounded-lg cursor-pointer hover:bg-red-700 ${activeTab === "tv" ? "bg-red-600" :"bg-gray-800"}`} 
            onClick={()=>handleTabclick("tv")}>Tv Shows</button>
            <button className={`px-4 py-2 rounded-lg cursor-pointer hover:bg-red-700 ${activeTab === "person" ? "bg-red-600" :"bg-gray-800"}`}
             onClick={()=>handleTabclick("person")}>Actor</button>
        </div>

        <form className='flex gap-2 items-stretch max-w-2xl mb-8 mx-auto' onSubmit={handleSearch} >
            <input type="text" 
            value={searchTerm}
            onChange={(e)=>setSearchTerm(e.target.value)}
            placeholder={`search for a ${activeTab}`}
            className='p-2 rounded-md text-white w-full bg-gray-800' />
            <button className='text-white p-2 flex items-center justify-center bg-red-600 hover:bg-red-700 rounded-full'>
                <Search className='size-6'/>
            </button>
        </form>
        
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>

        {results.map((results)=>{
            if(!results.poster_path && !results.profile_path) return null
            return (
                <div key={results.id} className='bg-gray-800 p-4 rounded '>

                    { activeTab === "person" ? (
                            <div className='flex flex-col items-center'>
                                <img src={ ORIGINAL_IMG_BASE_URL  + results.profile_path} alt="actor name" className='max-h-96 rounded mx-auto' />
                                <h2 className='text-center mt-2 font-semibold'>{results.name}</h2>

                            </div>
                        ):(
                            <Link to={"/watch/"+ results.id} onClick={()=>setContentType(activeTab)} >
                                <img src={ORIGINAL_IMG_BASE_URL + results.poster_path} alt={results.title || results.name} className='w-full h-auto rounded'/>
                                <h2 className='text-center mt-2 font-semibold'>{results.name || results.title}</h2>
                            </Link>
                        )

                    }
                   
                </div>
            )
})}
            </div>
        </div>
    </div>
  )
}

export default SearchPage
