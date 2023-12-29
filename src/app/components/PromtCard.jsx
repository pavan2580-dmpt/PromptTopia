"use client"
"use strict"
import { useState } from "react";
import Image from "next/image";
import { useSession } from "next-auth/react";
import {usePathname,useRouter} from 'next/navigation';
import Skletion from "../Skletion";
function PromtCard({ post,onDelete}) {

  const {data : session} = useSession();
  const pathName = usePathname();
  const router = useRouter();


  const[copy,SetCopy] = useState('');
  if (!post) {
   
    return (<><Skletion/></>);
  }
  
  const handlecopy = ()=>{
    SetCopy(post.prompt);
    navigator.clipboard.writeText(post.prompt);
    setTimeout(()=>{SetCopy('')},3000)
  }


 const HandleEdit = ()=>{
  const id = post._id
  router.push(`/update-prompt?id=${id}`)

}
async function handleDelete(){
  const option = confirm("Are tou sure you want to delete this prompt? ")
  if(option){
    try{
      const Delete = fetch(`/api/prompt/${post._id}`,
      {
        method:'DELETE'
      })
      onDelete(post._id);
    }
    catch(err){
      console.log(err)
    }
  }
}


  return (
    <>
      <div className="w-full bg-white rounded-lg h-[fit] border-2 border-solid border-gray-400 p-2 box-border md:w-[400px] md:justify-start shadow-xl ">
        <div className="flex w-full h-fit items-center justify-between pr-3">
              <div className="flex gap-3"
                 onClick={()=>{
                  router.push(`/profilepage?ids=${post.creator._id}`)
                 }}
                >
              <span >
              <Image 
             src={post.creator.image}
             alt="user_image"
             width={50}
             height={50}
             className="rounded-full cursor-pointer"
             />
              </span>
              
               <div className="w-[230px] text-ellipsis">
               <h3 className="text-md font-bold lg:text-xl">{post.creator.username}</h3>
               <p className="text-sm text-gray-500 font-medium lg:text-md">{post.creator.email}</p>
               </div>

              </div>

               <span className=" border-2 border-solid border-gray-400 p-1 rounded-lg hover:border-orange-600">
                <Image 
                src={copy === post.prompt ? 
                  '/assets/icons/tick.svg': 
                  '/assets/icons/copy.svg'}
                  alt="copy"
                  width={25}
                  height={25}
                  className="cursor-pointer"
                  onClick={()=>{
                    handlecopy();

                  }}
                />
               </span>
               
        </div>
        <p className="py-3 font-semibold text-gray-700">{post.prompt}</p>
        <h3 className="text-xl cursor-pointer font-semibold text-blue-800" >{post.tag}</h3>

              {

                session?.user.id === post.creator._id &&
                pathName === '/Account/profile' && 
                (
                  <footer className=" h-10 flex justify-end gap-9 px-3 font-semibold text-2xl border-t-2 border-gray-300 ">
                  <button className="text-emerald-600
                   hover:underline" onClick={HandleEdit}>Edit</button>
                  <button className="text-red-700 hover:underline" onClick={()=>{handleDelete()}}>Delete</button>
                </footer>
                )
              }
       
      </div>
      
    </>
  );
}

export default PromtCard;
