'use client'
"use strict"
import { useState,useEffect } from "react";
import PromtCard from "src/app/components/PromtCard.jsx";
import Skletion from "./Skletion";

const PromptList = ({data})=>{
  if (!Array.isArray(data)) {
    console.log("Data is not in array format");
   return (<Skletion/>)
  }
  return (
    <>
      {data.map((post)=>(
        <PromtCard 
        key={post._id}
        post={post}
       
        />
      ))}
    </>
  )
  
  
  }

export default function Home() {

  const[Posts,SetPosts] = useState([]);
  const [allPosts, setAllPosts] = useState([]);
  const [Loader,SetLoader] =  useState(true)
  const [Len,SetLen]= useState(0)

  useEffect(()=>{
    const FetchPost= async()=>{
      const Res= await fetch('api/prompt');
      const data = await Res.json();
      setAllPosts(data);
      SetPosts(data);
      SetLoader(false)
    }
    FetchPost();
  },[])

  const handleSearchChange = (e) => {
    const inputVal = e.target.value.trim(); 
    if (inputVal === '') {
        SetPosts(allPosts); 
    } else {
        const filteredData = allPosts.filter((post) => {
            const lowerInputVal = inputVal.toLowerCase();
            const lowerTag = post.tag.toLowerCase();
            const lowerUsername = post.creator.username.toLowerCase();
            const lowerPrompt = post.prompt.toLowerCase();
            return (
                lowerTag.includes(lowerInputVal) ||
                lowerUsername.includes(lowerInputVal) ||
                lowerPrompt.includes(lowerInputVal)
            );
        });
        SetPosts(filteredData);
    }
};



  
  return (
    <>

    <div className="hero_section lg:w-[60%] ">
      
    <h1 className="text-5xl text-center 
    font-bold mt-8 
     lg:text-6xl">Discover & Share</h1>
    <h1 
    className="bg-gradient-to-r from-amber-600 via-red-400 to-yellow-600  bg-clip-text text-transparent text-center
     text-6xl font-bold sm:text-6xl">Promts</h1>
    <p 
    className="text-center text-xl mt-10 
     sm:text-[22px] text-gray-600">Promptopia is an open-source prompting
      tool for modern world to discover,
       create and share creative prompts</p>

       <input type="text"  className="w-full h-10 rounded-lg 
       mt-[60px] px-3 box-border shadow-xl 
       outline-none sm:h-[45px]" 
       placeholder="Search for a username or Tag" 
       onChange={
        handleSearchChange
       } required/>




    </div>


    <div className="w-full h-fit mt-20 flex
     flex-wrap gap-8 py-10 box-border justify-center overflow-auto ">
      {
        Loader ? <Skletion/> :(<PromptList data={Posts}  />)
      }
       
    



    </div>
    </>
  )
}
