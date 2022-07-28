import React,{useEffect, useState} from 'react'
import {Movie} from '../typings'
import Image from 'next/image'
import {baseurl} from '../constans/movie'
import {FaInfo, FaInfoCircle, FaPlay} from 'react-icons/fa'
import Information from './information'

interface Props {
    netflixOriginals: Movie[]
}

function banner({netflixOriginals}:Props) {

    const [bannerMovie, setBannerMovie] = useState<Movie | null>(null)
    const [show, setShow] = useState(false)

    useEffect(() => {
        setBannerMovie(netflixOriginals[Math.floor(Math.random() * netflixOriginals.length)])
    },[netflixOriginals])

    console.log(bannerMovie)

  return (
    <div className='flex flex-col py-16 space-y-4 md:space-y-3 md:py-20 lg:space-y-4 lg:h-[65vh] lg:justify-end'>
      <div className='absolute top-0 left-0 -z-10 h-[95vh] w-screen'>
        <Image src={`${baseurl}${bannerMovie?.backdrop_path || bannerMovie?.poster_path}`} alt={bannerMovie?.title} 
        layout='fill'
        objectFit='cover'
        />
      </div>
          <h1 className=' max-w-xs text-2xl font-bold md:text-4xl md:max-w-md lg:text-6xl'>{bannerMovie?.title}</h1>
          <p className='max-w-xs text-[16px] text-shadow-md md:max-w-md md:text-[20px] lg:max-w-lg lg:text-[22px]'>{bannerMovie?.overview}</p>
      <div className='flex space-x-2'>
        <button className='bannerButton bg-white text-black'><FaPlay className='h-4 w-4 text-black md:h-7 md:w-7' />Play </button>
        <button type="button" className='bannerButton bg-gray-400' ><FaInfoCircle className='h-4 w-4 md:h-7 md:w-7' />More Info </button>
        
      </div>

    </div>

    
  )
}

export default banner