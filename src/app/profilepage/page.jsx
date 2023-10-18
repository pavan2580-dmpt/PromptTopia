"use client"
import React, { useEffect, useState } from 'react'
import PromtCard from '../components/PromtCard'
import { useSearchParams } from 'next/navigation'
function page() {
    const searchParams = useSearchParams();
    const GetID = searchParams.get('ids')
    const [Filter,SetFilter] = useState([]);
    const [Load,SetLoad] = useState(true)

    useEffect(()=>{
        const GatAll = async()=>{
           const Prmprt = await fetch(`/api/prompt/`,{
                method:'GET'
            })
            const respon = await Prmprt.json();
            
            const filter = respon.filter((post) => post.creator._id === GetID);
            SetFilter(filter)
           SetLoad(false)
        }
        GatAll()
       
    },[])
  return (
   <>
   
   {
    Load ? (<h1 className='text-2xl font-extrabold'>Loading</h1>) :(
      <div className=' w-full h-auto lg: mt-10  '>
      <h1 className='text-2xl  font-extrabold 
      bg-gradient-to-r from-blue-600 to-emerald-500 
      bg-clip-text text-transparent pb-3 md:text-3xl lg:text-5xl'>
        Profile Page </h1>
      <div className='flex flex-wrap gap-4 pl-2'>
  {
          Filter.map((post)=>(
              <PromtCard
              key={post._id}
              post={post}
              />
          ))
  }
</div>
  </div>
    )
   }
   
   </>
  )
}

export default page