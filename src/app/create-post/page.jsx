"use client"
import { useState } from "react"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Loader from "../components/Loader.jsx";

function CreatePost() {
  const router = useRouter();
  const {data : session} = useSession();

  const[Prompt,SetPrompt] = useState('');
  const[Tag,SetTag] = useState('');
  const[loader,Setloader] = useState(false)
  const[allowClick,SetallowClick] = useState(true)
  
  async function HandleSubmit(e){
    e.preventDefault();
    Setloader(true)
   if(allowClick){
    SetallowClick(false)
    if(Prompt.length == 0 || Tag.length ==0){
      toast("All are required...");
      Setloader(false)
    }
    else{
      try {
        const response =  await fetch('/api/prompt/new',{
          method:'POST',
          body:JSON.stringify({
            prompt:Prompt,
          userId: session?.user.id,
          tag:Tag
          })
        })
        if(response.ok){
          router.push('/')
        }
      } catch (error) {
        console.log("error is posting a new post error = ",error)
      }
      
      
    }

    SetallowClick(true)
  }
   
  }

  return (
    <>
    
    <div className="w-full h-[100vh] xl:mt-11 lg:mt-5  flex flex-col items-center justify-center md:block" >
    <ToastContainer/>
      <h1 className="text-5xl font-extrabold bg-gradient-to-r from-blue-600  to-sky-600  bg-clip-text text-transparent">Create Post</h1>
      <p className="text-lg text-gray-500  mt-5 p-5 lg:text-xl">Create and share amazing prompts with the world,
        and let your imagination run with any AI-powered platform.
      </p>
      <form >

        <div className="w-full  bg-gray-100 rounded-md p-2 shadow-md px-6">
          <h1 className="text-2xl p-4 text-gray-600 font-semibold">Your AI Prompt</h1>
          <textarea  
          cols="30"
           rows="10" 
            placeholder="Write your prompt here..." 
            className="rounded-md w-[100%] h-[150px] md:h-[300px] md:w-[80%]
             md:text-2xl p-3 mb-10" value={Prompt} onChange={(e)=>{SetPrompt(e.target.value)}}></textarea>
          <span 
          className=" text-black 
           mt-10 text-2xl md:text-3xl">Tag 
           <span className="text-sm text-gray-500 md:text-xl">
            (#product,#webdevelopment,#idea,#code)
            </span></span>
{/*--------------------------------------------------  */}
          <input 
          type="text" 
          name="tag"
           className="w-full h-10 px-2 mt-5 md:w-[50%] block"
            placeholder="#Tag"
            value={Tag} onChange={(e)=>{SetTag(e.target.value)}}/>
{/* ------------------------------------------------------------- */}
           <button className="border-2 border-solid boder-black px-8 py-2  rounded-3xl
            bg-white ml-[50%] text-3xl translate-x-[-50%] mt-4 mb-20 md:mt-11 hover:bg-red-500 hover:text-white"
            onClick={HandleSubmit}
            >{loader?<Loader />:'Post'}</button>

        </div>
      </form>
    </div>
    
    
    </>
  )
}

export default CreatePost