import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import { SMALL_IMG_BASE_URL } from '../utils/constant'
import { Trash } from 'lucide-react'
import toast from 'react-hot-toast'


function formatDate(datestring){
    const date = new Date(datestring)
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun","jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
    const month = monthNames[date.getUTCMonth()]
    const day = date.getUTCDate()
    const year = date.getUTCFullYear()
    return `${month} ${day}, ${year}`


}

const SearchHistoryPage = () => {
    const [SearchHistory, setSearchHistory] = useState([])

    useEffect(() => {
      const getSearchHistory = async()=>{

        try {
            const response = await axios.get(`/api/v1/search/history`)
            setSearchHistory(response.data.content)
        } catch (error) {
            console.log(error.message)
            setSearchHistory([])
        }
      }
      getSearchHistory()
    }, [])

    if(SearchHistory.length === 0){
        return(
            <div className='min-h-screen bg-black text-white'>
                <Navbar/>
                <div className='max-w-6xl mx-auto px-4 py-8'>
                <h1 className='text-3xl font-bold mb-8'>search history</h1>
                <div className='flex justify-center items-center h-96'>
                    No search history found
                </div>
                </div>
            </div>
        )
    }

   const handleDelete = async(entry)=>{
        try {
            await axios.delete(`/api/v1/search/history/${entry.id}`)
            setSearchHistory(SearchHistory.filter(item=>item.id !== entry.id))
            toast.success("Item deleted successfully")
        } catch (error) {
            console.log(error.message)
            toast.error("Failed to delete item")
        }
    }
    
  return (
    <div className='min-h-screen bg-black text-white'>
      <Navbar/>
      <div className='max-w-6xl mx-auto px-4 py-8'>
        <h1 className='text-3xl font-bold mb-8'>Search History</h1>
        <div className='grid  sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>  

            {SearchHistory?.map((entry)=>(
                <div className='bg-gray-800 rounded-md p-4 flex items-start' key={entry.id}>
                    <img src={SMALL_IMG_BASE_URL+entry.image} alt="History image" className='size-16 mr-4 object-cover rounded-full' />
                    <div className='flex flex-col'>
                        <span className='text-white text-lg'>{entry.title}</span>
                        <span className='text-gray-400 text-sm'>{formatDate(entry.createdAt)}</span>
                    </div>

                    <span className={`py-1 px-3 min-w-20 text-center rounded-full text-sm ml-auto
                      ${entry.searchType === "movie"? "bg-red-600" : entry.searchType ==="tv" ?"bg-blue-600":"bg-green-600"}`}  >
                      {entry.searchType[0].toUpperCase() + entry.searchType.slice(1)}
                    </span>
                    <Trash className='size-5 ml-4 cursor-pointer hover:fill-red-600 hover:text-red-600' onClick={()=>handleDelete(entry)}/>
                  
                </div>
            ))}
        </div>
      </div>
    </div>
  )
}

export default SearchHistoryPage
