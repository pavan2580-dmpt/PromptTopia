"use client"
import {useState,useEffect} from "react";
import {useSession} from "next-auth/react";
import {useRouter} from "next/navigation";
import PromtCard from "@/app/components/PromtCard";
import Searching from "./Searching";
import LoggedUserError from "@/app/LoggedUserError";

function Profile() {

    const {data:session} = useSession();
    const [Posts,SetPosts] = useState([]);
    const [isLoading,SetIsLoading]= useState(true);
    const router = useRouter();
    useEffect(()=>{
        const FetchPost= async()=>{
          
          const Res= await fetch(`/api/users/${session?.user.id}/posts`);
          const data = await Res.json();
          SetPosts(data);
          SetIsLoading(false);
          
        }
        FetchPost();
      },[session?.user.id])

      const handleDeletePost = (postId) => {

        SetPosts(Posts.filter(post => post._id !== postId));
      };

  return (
  <>
  {
    session?.user.id?(
      <div className="w-full h-auto 2xl:mt-20">
      <h1 className="text-5xl font-extrabold 
      bg-gradient-to-r from-blue-600 to-emerald-500 
      bg-clip-text text-transparent mb-4 mt-3 p-2 md:text-left">My Profile </h1>
      <p className="text-xl py-3 mb-4 md:text-2xl text-gray-700">Welcome to your personalized profile page</p>
   
 {
  isLoading?(<>
  <div className="w-full h-fit flex justify-center items-center">
  <Searching/>
  </div>
  </>):(
    <span className="flex flex-wrap gap-6">
    {Posts.length > 0 ? (
Posts.map((post) => (
<PromtCard
  key={post._id}
  post={post}
  onDelete={handleDeletePost}
/>
))
) : (
<p className="text-2xl font-bold ml-[50%] translate-x-[-50%] w-fit">No Posts available...</p>
)}
</span>
  )
 }
       
  
  </div>
    ):(<LoggedUserError/>)
  }
  </>
  )
}

export default Profile