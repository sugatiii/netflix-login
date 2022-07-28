import React, {useEffect, useState} from 'react'
import {SearchIcon} from '@heroicons/react/outline'
import {BellIcon} from '@heroicons/react/solid'
import Link from 'next/link'
import useAuth from '../hooks/useAuth'

function header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const {logout} = useAuth()

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsScrolled(true)
      } else {
        setIsScrolled(false)
      }
    }

    window.addEventListener('scroll', handleScroll)

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return (
    <header className={`${isScrolled && 'bg-[#141414]'}`}>
      <div className="flex items-center space-x-2 md:space-x-10">
        <img
        src='./logo.png'
        width={100}
        height={100}
        className='cursor-pointer object-contain'
        // alt='Netflix Logo'
        />
        <ul className='hidden space-x-4 md:flex'>
          <li className='linkHeader'>HOME</li>
          <li className='linkHeader'>FILTER</li>
          <li className='linkHeader'>STORIES</li>
          <li className='linkHeader'>ANIME</li>
          <li className='linkHeader'>DONGHUA</li>
        </ul>
      </div>

      <div className='flex items-center text-sm space-x-4'>
        <SearchIcon className='hidden h-6 w-6 sm:inline'/>
        <p className='hidden lg:inline'>Kids</p>
        <BellIcon className='h-6 w-6'/>
        <Link href="./account">
          <img
          src='./account.jpeg'
          width={30}
          height={30}
          className='rounded cursor-pointer'
          />
        </Link>
      </div>
    </header>

  )
}

export default header