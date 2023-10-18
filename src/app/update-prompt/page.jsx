"use client"
import { useEffect, useMemo, useState } from "react"
import { useSession } from "next-auth/react"
import { useRouter,useSearchParams } from "next/navigation"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Loader from "@/app/components/Loader.jsx";
import UpdateLoader from "./UpdateLoader";



 function EditPost({params}) {
  const router = useRouter();
  const {data : session} = useSession();

  const[Promptval,SetPrompt] = useState('');  //store prompt
  const[Tag,SetTag] = useState('');//Store tag
  const[loader,Setloader] = useState(false)//loader
  const[allowClick,SetallowClick] = useState(true)//conditional clicking
  const[promptData,SetpromptData] = useState({}); //get data from server
  const searchParams = useSearchParams();// params
  const PromptId = searchParams.get('id');
  const[Skel,SetSkel] = useState(true)
  

  useEffect(()=>{
    const getPromptData =async ()=>{
      if(PromptId){
        const GetData = await fetch(`/api/prompt/${PromptId}`,{
          method:'GET'
        })
       const DATA = await GetData.json();
      SetTag(DATA.tag)
      SetPrompt(DATA.prompt)
      SetSkel(false)
      }
      }
      getPromptData();
  },[PromptId])

  async function HandleEdit(e){
    e.preventDefault();
    Setloader(true)
  
    if(Promptval.length !=0 && Tag.length !=0){
      SetallowClick(false)
      const SendData = await fetch(`/api/prompt/${PromptId}`,{
        method:'PATCH',
        body:JSON.stringify({
          prompt : Promptval,
          tag : Tag,
        })
      })
      SetallowClick(true)
      if(SendData.ok){
        router.push('/')
      }
    }
   else{
    toast.error("Fill the missing fields")
    Setloader(false)
    SetallowClick(false)
   }
   
  }

  return (
    <>
  {
    Skel ? <UpdateLoader/> :(
   
        
    <div className="w-full h-[100vh] xl:mt-11 lg:mt-5  flex flex-col items-center justify-center md:block" >
    <ToastContainer/>
      <h1 className="text-5xl font-extrabold bg-gradient-to-r from-blue-600  to-sky-600  bg-clip-text text-transparent pt-[18%] sm:pt-1">Update Post</h1>
      <p className="text-lg text-gray-500  mt-5 p-5 lg:text-xl">Create and share amazing prompts with the world,
        and let your imagination run with any AI-powered platform.
      </p>
      

        <div className="w-full  bg-gray-100 rounded-md  shadow-md pl-2 ">
          <h1 className="text-2xl p-4 text-gray-600 font-semibold">Your AI Prompt</h1>
          <textarea  
          cols="30"
           rows="10" 
            placeholder="Write your prompt here..." 
            className="rounded-md w-[100%] h-[150px] md:h-[300px] md:w-[80%]
             md:text-2xl p-3 mb-10" value={Promptval} onChange={(e)=>{SetPrompt(e.target.value)}}></textarea>
          <span 
          className=" text-black 
           mt-10 text-2xl md:text-3xl">Tag 
           <span className="text-sm text-gray-500 md:text-xl text-ellipsis">
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
          {
            allowClick ? (
              <button className="border-2 border-solid boder-black px-8 py-2  rounded-3xl
              bg-white ml-[50%] text-3xl translate-x-[-50%] mt-4 mb-20 md:mt-11 hover:bg-red-500 hover:text-white"
              onClick={HandleEdit}
              >Update</button>
            ):(
            <button className="border-2 border-solid boder-black px-8 py-2  rounded-3xl
            bg-white ml-[50%] text-3xl translate-x-[-50%] mt-4 mb-20 md:mt-11 hover:bg-red-500 hover:text-white">
              <Loader/>
            </button>
            
            
            )
          }

        </div>
    </div>

    )
  }
    
    
    </>
  )
}

export default EditPost

