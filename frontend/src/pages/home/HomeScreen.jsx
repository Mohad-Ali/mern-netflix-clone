import React, { useState } from 'react'
import Navbar from '../../components/Navbar'
import { Link } from 'react-router-dom'
import { Info, Play } from 'lucide-react'
import useGetTrending from '../../hooks/useGetTrending'
import { MOVIE_CATEGORIES, ORIGINAL_IMG_BASE_URL, TV_CATEGORIES } from '../../utils/constant'
import { useContentStore } from '../../store/content'
import Contentslider from '../../components/Contentslider'

const HomeScreen = () => {

 const {trendingContent} = useGetTrending()
 
 const {contentType} = useContentStore()
 const [imgaeLoading, setImgaeLoading] = useState(true)

 if(!trendingContent){
      return (
        <div className='relative h-screen text-white'>
          <Navbar />
          <div className='absolute w-full h-screen top-0 left-0 bg-black/70 flex items-center justify-center shimmer'/>
        </div>
      )
 }

  return (
    <>
      <div className ="relative h-screen text-white">
      <Navbar />

    {imgaeLoading && (
      <div className='absolute flex w-full h-screen top-0 left-0 items-center justify-center bg-black/80 shimmer'></div>
    )}

      <img src={ORIGINAL_IMG_BASE_URL + trendingContent?.backdrop_path} alt="hero" className='absolute top-0 left-0 w-full h-full object-cover -z-50'
       onLoad={()=>setImgaeLoading(false)}/>
        <div className='absolute top-0 left-0 w-full h-full bg-black bg-opacity-50 -z-50' aria-hidden="true" />
          <div className='absolute top-0 left-0 w-full h-full flex flex-col justify-center px-8 md:px-16 lg:px-32 '>

            <div className='bg-gradient-to-b from-black via-transparent to-transparent absolute w-full h-full top-0 left-0 -z-10' />

            <div className='max-w-2xl'>
              <h1 className='mt-4 text-6xl font-extrabold text-balance'>{trendingContent?.title || trendingContent?.name}</h1>
              <p className='mt-2 text-lg'>{trendingContent?.release_date?.split("-")[0] || trendingContent?.first_air_date?.split("-")[0]} | {trendingContent?.adult ? "18+" : "PG-13"}</p>
              <p className='mt-4 text-lg'>{trendingContent?.overview.length>200 ? trendingContent?.overview.slice(0,200) +"..." : trendingContent?.overview}</p>
            </div>

            <div className='flex mt-8'>
              <Link to={`/watch/${trendingContent?.id}`} className='bg-white hover:bg-white/80 text-black px-4 py-2 mr-2 flex items-center rounded '>
              <Play className='size-6 mr-2 cursor-pointer fill-black'/>
              Play
              </Link>

              <Link to={`/watch/${trendingContent?.id}`} className='bg-gray-500/70 hover:bg-gray-500 text-white px-4 py-2 flex items-center rounded '>
              <Info className='size-6 mr-2 cursor-pointer'/>
              More Info
              </Link>

            </div>
          </div>
      </div>

      <div className='flex flex-col gap-10 bg-black py-10'>
        { contentType ==="movie" ? MOVIE_CATEGORIES.map((category)=><Contentslider key={category} category={category}/>) : TV_CATEGORIES.map((category)=><Contentslider key={category} category={category}/>)}
      </div>
    </>
  )
}

export default HomeScreen
