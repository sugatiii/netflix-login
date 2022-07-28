import React from 'react'
import Image from 'next/image'
import { useForm, SubmitHandler } from "react-hook-form";
import useAuth from '../hooks/useAuth'

type Inputs = {
  email: string,
  password: string,
};
function login() {
  const { register, handleSubmit, watch, formState: { errors } } = useForm<Inputs>();
  const [login, setLogin] = React.useState(false);
  const {signIn,signUp } = useAuth();

  const onSubmit: SubmitHandler<Inputs> = async({email,password})=>{
    if(login){
        await signIn(email,password)
    }else{
        await signUp(email,password)
    }
  }


  return (
    <div className='relative flex h-screen w-screen flex-col bg-black md:items-center md:justify-center md:bg-transparent '>
        <Image 
        src={'/bg-net.png'}
        layout='fill'
        objectFit='cover'
        className='-z-10 !hidden opacity-60 md:!inline'
        />

        <img
        src='./logo.png'
        width={150}
        height={150}
        className='absolute cursor-pointer object-contain  top-4 left-4 md:top-6 md:left-6'
        // alt='Netflix Logo'
        />

        <form onSubmit={handleSubmit(onSubmit)} className='relative mt-24 rounded space-y-8 bg-black/75 py-10 px-6 md:mt-0 md:max-w-md md:px-14 '>
            <h1 className='text-[25px] font-semibold'>Sign In</h1>
            <div className='space-y-4'>
                <label className='inline-block w-full'>
                    <input type='email' id='email' placeholder='Email' className='input' {...register("email", { required: true })}/>
                </label>
                {errors.email && <p>This field is required</p>}
                <label className='inline-block w-full'>
                    <input type='password' id='password' placeholder='Password' className='input' {...register("password", { required: true })}/>

                </label>
                {errors.password && <p>This field is required</p>}
                <button type="submit" className='w-full p-2 bg-[#e71414] text-white rounded-lg'>Sign In</button>
            </div>

            <h1>
                New to Netflix ? <button className='hover:underline'>Sign Up</button>
            </h1>
            
        </form>
    </div>
  )
}

export default login