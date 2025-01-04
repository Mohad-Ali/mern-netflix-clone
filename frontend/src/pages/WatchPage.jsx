import React, { useEffect, useRef, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useContentStore } from '../store/content'
import axios from 'axios'
import Navbar from '../components/Navbar'
import { ChevronLeft, ChevronRight} from 'lucide-react'
import ReactPlayer from 'react-player'
import { ORIGINAL_IMG_BASE_URL, SMALL_IMG_BASE_URL } from '../utils/constant'
import { formattedDate } from '../utils/dateFormatted'
import WatchPageSkeleton from '../components/Skeleton/WatchPageSkeleton'


const WatchPage = () => {

  const { id } = useParams()
  const [trailers, setTrailers] = useState([])
  const [similarContent, setSimilarContent] = useState([])
  const [currentTrailerIdx, setCurrentTrailerIdx] = useState(0)
  const [loading, setLoading] = useState(true)
  const [content, setContent] = useState({})


  const {contentType} = useContentStore()

  const sliderRef = useRef(null)

  useEffect(() => {
    const getTrailers = async()=>{
        try {
          const response = await axios.get(`/api/v1/${contentType}/${id}/trailers`)
         setTrailers(response.data.trailers)
        } catch (error) {
          if(error.message.includes("404")){
            setTrailers([])
          }
        }
    }
    getTrailers()
  }, [contentType,id])

  useEffect(() => {
    const getSimilar = async()=>{
        try {
          const response = await axios.get(`/api/v1/${contentType}/${id}/similar`)
         setSimilarContent(response.data.content)
        } catch (error) {
          if(error.message.includes("404")){
            setSimilarContent([])
          }
        }
    }
    getSimilar()
  }, [contentType,id])

  useEffect(() => {
    const getContentDetails = async()=>{
        try {
          const response = await axios.get(`/api/v1/${contentType}/${id}/details`)
         setContent(response.data.content)
        } catch (error) {
          if(error.message.includes("404")){
            setContent(null)
          }
        }finally{
          setLoading(false)  
        }
    }
    getContentDetails()
  }, [contentType,id])
   
 
  const handlePrev =()=>{
    if(currentTrailerIdx > 0)setCurrentTrailerIdx(currentTrailerIdx-1)
  }
  const handleNext =()=>{
    if(currentTrailerIdx < trailers.length-1)setCurrentTrailerIdx(currentTrailerIdx+1)
  }


  
  const scrollLeft =()=>{
    if(sliderRef.current){
      sliderRef.current.scrollBy({left:-sliderRef.current.offsetWidth, behavior:'smooth'})
    }
  }
  
  const scrollRight=()=>{
   if(sliderRef.current){
     sliderRef.current.scrollBy({left:sliderRef.current.offsetWidth, behavior:'smooth'})
   }
  }

  if(loading) return (
    <div className='min-h-screen bg-black p-10'>
      <WatchPageSkeleton/>
    </div>
  )
 
if(!content) return (
    <div className='min-h-screen bg-black text-white'>
      <Navbar/>
      <div className='flex items-center justify-center max-w-6xl mx-auto mt-40 h-full'>
      <h2 className=' text-2xl sm:text-5xl font-bold text-balance mt-5'>Content not found 😿</h2>
      </div>
    </div>
  )

  return (
    <div className='bg-black min-h-screen text-white'>
      <div className='h-full container mx-auto px-4 py-8'>
        <Navbar/>

        {trailers.length > 0 && (
          <div className='flex items-center justify-between mb-4'>

            <button className={`bg-gray-500/70 hover:bg-gray-500 px-4 py-2 rounded text-white ${currentTrailerIdx === 0 ?"cursor-not-allowed opacity-50":""}`} 
            disabled={currentTrailerIdx === 0} onClick={handlePrev}>
             <ChevronLeft size={24}/>
            </button>

            <button className={`bg-gray-500/70 hover:bg-gray-500 px-4 py-2 rounded text-white ${currentTrailerIdx === trailers.length -1 ?"cursor-not-allowed opacity-50":""}`} 
            disabled={currentTrailerIdx === trailers.length -1} onClick={handleNext}>
            <ChevronRight size={24}/>
            </button>

          </div>
        )}
        
        <div className='aspect-video mb-8 p-2 sm:px-10 md:px-20'>
          {trailers.length > 0 && (
            <ReactPlayer controls={true} width={"100%"} height={"70vh"} className="mx-auto overflow-hidden rounded-lg" 
            url={`https://www.youtube.com/watch?v=${trailers[currentTrailerIdx].key}`} />
          )}

          {trailers?.length === 0 && (
              <h2 className='text-center text-xl mt-5'>
                No trailers available for {" "}
                <span className='font-bold text-red-600'>{content.title || content.name}</span>😿
              </h2>
            )
                 }
        </div>

        <div className='flex flex-col md:flex-row items-center justify-between max-w-6xl mx-auto gap-20 '>
          <div className='mb-4 md:mb-0'>
            <h2 className='text-5xl font-bold text-balance'>{content?.title || content?.name}</h2>

            <p className='mt-3 text-lg'>
              {formattedDate(content?.release_date || content?.first_aira_date)} | 
              {content?.adult ? <span className='text-red-600'> 18+ </span> : <span className='text-green-600'> PG-13 </span>}
            </p>
            <p className='mt-4 text-sm'>{content.overview }</p>
          </div>
          <img src={ORIGINAL_IMG_BASE_URL + content.poster_path} alt="poster image" className='max-h-[600px] rounded-lg' />
        </div>


        {similarContent.length > 0 && (
          <div className='max-w-5xl mx-auto mt-12 relative'>
            <h3 className='font-bold text-3xl text-white mb-4'>
              Similar Movies/ Tv Shows
            </h3>

            <div className='flex overflow-x-scroll scrollbar-hide gap-4 pb-4 group' ref={sliderRef}>
            {similarContent.map((content) =>{
              if(!content.poster_path) return null
              return (
                < Link to={`/watch/${content.id}`} key={content.id} className='w-52 flex-none'>
                  <img src={SMALL_IMG_BASE_URL + content.poster_path} alt="poster path" className='w-full h-auto rounded-md' />
                  <h4 className='font-semibold text-center text-white text-lg mt-2'>{content.title || content.name}</h4>
                </Link>
               )
            })}
              <ChevronRight className='absolute top-1/2 -translate-y-1/2 right-2 w-8 h-8 rounded-full bg-red-600 opacity-0 group-hover:opacity-100 transition-all duration-300 cursor-pointer text-white '
              onClick={scrollRight}/>

              <ChevronLeft  className='absolute top-1/2 -translate-y-1/2 left-2 w-8 h-8 rounded-full bg-red-600 opacity-0 group-hover:opacity-100 transition-all duration-300 cursor-pointer text-white '
              onClick={scrollLeft}/>
            </div>    
          </div>
        )}

      </div>
    </div>
  )
}

export default WatchPage
