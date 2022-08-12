import React, { useEffect, useState } from 'react'
import MuiModal from '@mui/material/Modal';
import { useRecoilState, useRecoilValue } from 'recoil';
import { modalState, movieState } from '../atoms/modalAtom';
import { PlusIcon, ThumbUpIcon, VolumeOffIcon, VolumeUpIcon, XIcon } from '@heroicons/react/outline';
import { Element, Genre } from '../typings';
import ReactPlayer from 'react-player';
import { FaPlay } from 'react-icons/fa';


function Modal() {
  const [showModal, setShowModal] = useRecoilState(modalState);
  const [Movie, setMovie] = useRecoilState(movieState);
  const [trailer, setTrailer] = useState(null);
  const [genres, setGenres] = useState<Genre[]>([]);
  const [muted, setMuted] = useState(true);

  const handleClose = () => {
    setShowModal(false);
    }

  useEffect(() => {
    if(!Movie) return

   async function fetchMovie() {
      const data = await fetch(
        `https://api.themoviedb.org/3/${Movie?.media_type === 'tv' ? 'tv' : 'movie'}/${Movie?.id}?api_key=${process.env.NEXT_PUBLIC_API_KEY}&language=en-US&append_to_response=videos`
        ).then((response) => response.json())

      if(data?.videos){
        const index = data.videos.results.findIndex((element : Element) => element.type === 'Trailer')
        setTrailer(data.videos?.results[index]?.key)
      }
      if(data?.genres){
        setGenres(data.genres)
      }
   }

    fetchMovie()
  }, [])
  console.log(Movie)

  return (
    <MuiModal open={showModal} onClose={handleClose} 
    className='fixex !top-5 left-0 right-0 z-50 mx-auto w-full max-w-md md:max-w-lg lg:max-w-4xl'
    >
        <>
            <button onClick={handleClose} 
            className='modalButton absolute top-5 right-5 !z-40 h-9 w-9 border-none bg-[#181818]'
            >
                <XIcon className='h-6 w-6'/>
            </button>

            <div className='relative pt-[56.25%]'>
                <ReactPlayer
                url={`https://www.youtube.com/watch?v=${trailer}`}
                width='100%'
                height='100%'
                style={ {position: 'absolute', top: 0, left: 0} }
                playing
                muted={muted}
                />
                <div className='absolute flex bottom-5 px-4 w-full space-x-2 justify-between transition md:bottom-10'>
                    <div className='flex space-x-3'>
                        <button className='playerButton bg-white text-black'>
                            <FaPlay className='h-4 w-4 text-black md:h-7 md:w-7' />
                            Play 
                        </button>
        
                        <button className='modalButtonPlayer p-1 bg-[#c9c9c7] md:px-2'>
                            <PlusIcon className='h-7 w-7' />
                        </button>
                        <button className='modalButtonPlayer p-1 bg-[#c9c9c7] md:px-2'>
                            <ThumbUpIcon className='h-7 w-7' />
                        </button>

                        
                    </div>
                        <button className='modalButtonPlayer py-1 px-1 bg-[#c9c9c7] md:px-2' onClick={()=>setMuted(!muted)}>
                            {
                                muted ? <VolumeOffIcon className='h-7 w-7' /> : <VolumeUpIcon className='h-7 w-7' />
                            }
                        </button>

                </div>
            </div>
            <div className='bg-[#000000] text-light pb-5'>
                <div>
                    <div className='flex flex-col space-x-2 px-2'>
                        <div className='px-2 flex flex-row space-x-2'>
                            <h2>Vote : </h2>
                            <p className='text-green-500'>{Movie?.vote_average}</p>
                        </div>
                        <div className='flex flex-row space-x-2'>
                            <h2>Release Date : </h2>
                            <p>{Movie?.release_date}</p>
                        </div>
                        <div className='text-lg w-5/6'>
                            <p>{Movie?.overview}</p>
                            <div className='flex flex-row'>
                                <p className='text-[gray]'>Genres : </p>&ensp;
                                {
                                    genres.map((genre : Genre) => genre.name).join(', ')
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
    
        </>
    </MuiModal>
  )
}

export default Modal