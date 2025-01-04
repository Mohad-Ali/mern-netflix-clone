import React, { useEffect, useState } from 'react'
import { useContentStore } from '../store/content'
import axios from 'axios'

const useGetTrending = () => {
  const [trendingContent, setTrendingContent] = useState(null)
  const{contentType}= useContentStore()

  useEffect(() => {
    const getTrending = async()=>{
        const response = await axios.get(`/api/v1/${contentType}/trending`)
        setTrendingContent(response.data.content)
    }
   
    getTrending()
  }, [contentType])

  return {trendingContent}
  
}

export default useGetTrending
