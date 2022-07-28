import React from 'react'
import {Movie} from '../typings'
import Image from 'next/image'
import {baseurl} from '../constans/movie'
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/solid'
import Thumbnail from './thumbnail'

interface Props{
    movie : Movie[]
    title : string
}

function row({movie, title}:Props) {

   const rowRef = React.useRef<HTMLDivElement>(null)
   const [isMoved, setIsMoved] = React.useState(false)

   const handleClick = (direction : string) => {
    setIsMoved(true)
    if(rowRef.current){
        const {clientWidth, scrollLeft} = rowRef.current

    const scrollTo = direction === 'left' ? scrollLeft - clientWidth : scrollLeft + clientWidth
    rowRef.current.scrollTo({left: scrollTo, behavior: 'smooth'})
    }
  
}

  return (
    <div className='h-40 space-y-1 md:space-y-6'>
        <p className='text-lg font-semibold text-[#e5e5e5]'>{title}</p>
        <div className='group relative md:-ml-2'>
            <ChevronLeftIcon className={`absolute top-0 left-2 bottom-0 m-auto z-40 h-11 w-11
            cursor-pointer opacity-0 group-hover:opacity-100 hover:scale-125
            ${!isMoved && "hidden"}`}
            onClick={()=> handleClick("left")}
            />

            <div ref={rowRef} className='flex space-x-1.5 overflow-x-scroll md:space-x-2.5 scrollbar-hide'>
                {movie.map((movie) => 
                    <Thumbnail key={movie.id} movie={movie}/>
                )}
            </div>

            <ChevronRightIcon className='absolute top-0 right-2 bottom-0 m-auto z-40 h-11 w-11
            cursor-pointer opacity-0 group-hover:opacity-100 hover:scale-125
            '
            onClick={()=> handleClick("right")}
            
            />
        </div>
    </div>
  )
}

export default row