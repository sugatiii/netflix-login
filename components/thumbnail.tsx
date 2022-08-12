import React from 'react'
import {Movie} from '../typings'
import Image from 'next/image'
import { useRecoilState } from 'recoil'
import { modalState, movieState } from '../atoms/modalAtom'

interface Props {
    movie: Movie
}

function thumbnail({movie}:Props) {
  const [currentMovie, setCurrentMovie] = useRecoilState(movieState)
  const [showModal, setShowModal] = useRecoilState(modalState)
  return (
    <div className='relative h-28 min-w-[140px] cursor-pointer  transition duration-200
    ease-out hover:scale-105 md:h-40 md:min-w-[280px] md:hover:scale-105
    '>
        <Image
        src={`https://image.tmdb.org/t/p/w500${movie?.backdrop_path || movie?.poster_path}`} alt={movie?.title}
        className="rounded-sm object-cover md:rounded"
        layout="fill"
        onClick={() => {
          setCurrentMovie(movie);
          setShowModal(true);
        }}
        />
    </div>
  )
}

export default thumbnail