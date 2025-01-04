import React, { useEffect, useRef, useState } from 'react'
import { useContentStore } from '../store/content'
import { SMALL_IMG_BASE_URL } from '../utils/constant'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { ChevronLeft, ChevronRight } from 'lucide-react'

const Contentslider = ({category}) => {

    const{contentType} = useContentStore()
    const [content, setContent] = useState([])
    const [showArrows, setShowArrows] = useState(false)

    const sliderRef = useRef(null)

    const formattedCategory = category.replaceAll("_"," ")[0].toUpperCase() + category.replaceAll("_"," ").slice(1)
    const formattedContentType = contentType === "movie" ? "Movies" : "Tv shows"

    useEffect(() => {
     const getContent = async()=>{
       const response = await axios.get(`/api/v1/${contentType}/${category}`)
       setContent(response.data.content)
     }
      getContent()
    }, [contentType,category])

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

  return (
    <div className='relative bg-black text-white px-5 md:px-20'
    onMouseEnter={()=>setShowArrows(true)}
    onMouseLeave={()=>setShowArrows(false)}
    >
      <h2 className='mb-4 text-2xl font-bold '>{formattedCategory} {formattedContentType}</h2>

      <div className='flex space-x-4 overflow-x-scroll scrollbar-hide' ref={sliderRef}>
        {content.map((item)=>(
         <Link to={`/watch/${item.id}`} key={item.id} className='min-w-[250px] relative group'>
          <div className='rounded-lg overflow-hidden'>
            <img src={SMALL_IMG_BASE_URL+item.backdrop_path} alt="content image" className='group-hover:scale-105 transition-transform duration-500 ease-in-out' />
          </div>
          <p className=' mt-2 text-center '>{item.title}</p>
         </Link>
        ))}
      </div>

      { showArrows && (
        <>
        <button className='absolute top-1/2 -translate-y-1/2 left-5 md:left-24 flex items-center justify-center size-12 rounded-full bg-black bg-opacity-50 hover:bg-opacity-75 text-white '
        onClick={scrollLeft}>
        <ChevronLeft size={24}/>
        </button>

        <button className='absolute top-1/2 -translate-y-1/2 right-5 md:right-24 flex items-center justify-center size-12 rounded-full bg-black bg-opacity-50 hover:bg-opacity-75 text-white '
        onClick={scrollRight}>
        <ChevronRight size={24}/>
        </button>
        </>
      )}
    </div>
  )
}

export default Contentslider
