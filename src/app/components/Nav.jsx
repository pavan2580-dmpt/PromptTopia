"use client"
import Image from "next/image";
import logos from 'public/assets/images/logo.svg';
import { useEffect, useRef, useState } from "react";
import Link from 'next/link';
import { BsPersonCircle } from "react-icons/bs";
import { RxHamburgerMenu } from "react-icons/rx";
import { signIn,signOut,useSession, getProviders } from "next-auth/react";
import { useRouter } from "next/navigation"


function Nav() {
  const {data: session} = useSession();
  const Show = useRef(null);
  const [show,setshow] = useState(false);
  const [providers,setProviders] = useState(null)
  const route = useRouter();

        useEffect(()=>{  //useEffect to get the providers
          const setUpProvider = async ()=>{
            try {
              const response = await getProviders();
              setProviders(response);
            } catch (error) {
              console.error("Error fetching providers:");
            }
          }
          setUpProvider();// function call;
        },[])

        function Toggle(){  //mobile navigation toggle funnction.
         
          if(show)
          {
            Show.current.style.display = "none"
            setshow(!show);
            }
            else{ 
              Show.current.style.display = "block"
              setshow(!show);
              }
          }
        
  return (
    <div className="flex w-full h-fit p-2 justify-between  mt-4">
      <div className="logo flex items-center text-4xl gap-2 font-bold">
        <Link href={'/'}>
          <Image src={logos} width={40} height={40} alt="logo" />
          </Link>
        <p  onClick={()=>{route.push('/')}}
        className="hidden lg:block bg-gradient-to-r
         from-amber-600 via-red-500 to-yellow-600 
          bg-clip-text text-transparent cursor-pointer">PromptTopia</p>
        
      </div>
    
      {!session?.user ? (
        <>
        { 
        
        providers && Object.values(providers).map((provider)=>(
        <div className="Sign_btn hidden md:block" key={provider.name}>
          <button
            className="btn border-black border-2 border-solid py-2 px-6 rounded-[25px] text-white bg-black hover:bg-white hover:text-black"
            type="button"
            key={provider.name}
            onClick={()=>{signIn(provider.id)}}
          >
            Sign in
          </button>
        </div>
          ))
      }
      </>
      ) : (
       <>
       
         <div className="Loged_user md:flex md:gap-4 md:items-center hidden ">
         <Link href='/create-post'>
           <button
             className="border-black border-2 bg-black 
             border-solid text-white px-6 rounded-3xl 
             py-2 hover:bg-white hover:text-black" 
            
           >
             Create Post
           </button>
         </Link>
         <button
           className="border-black border-2 border-solid
            py-2 px-6 rounded-[25px] text-white bg-black
             hover:bg-white hover:text-black" onClick={signOut}
            type="button"
         >
           Sign Out
         </button>
         <Link href={'/Account/profile'}>
           <Image src={session?.user.image} width={40} height={40 } alt="profile" className="rounded-full"/>
         </Link>
       </div>
      
        
      
       </>
      )
  }
      
      {/* Navigation for mobile design */}
      <div className="md:hidden flex">
        {!session?.user ?(
      <>
          {  providers && Object.values(providers).map((provider)=>(
          <button
            className="border-2 border-black border-solid px-4
             text-white bg-black rounded-3xl hover:bg-white
              hover:text-black" key={provider.name}
              onClick={()=>{signIn(provider.id)}}>
            Sign in
          </button>
          ))
          }
        </>
        ) : (
          <>
            <RxHamburgerMenu size={40} className="cursor-pointer"
            onClick={()=>{
              if(show)
              {
                Show.current.style.display = "none"
                setshow(!show);
                }
                else{ 
                  Show.current.style.display = "block"
                  setshow(!show);
                  }
              }}/>
            <div className="absolute shadow-xl bg-white rounded-lg p-2 box-border hidden w-[300px] h-[200px]  md:hidden top-[60px] left-[25%] text-2xl sm:left-[350px] " ref={Show}>
              <Link href={'/create-post'}>
              <button className="hover:bg-slate-400 px-4 text-left py-2 text-black
               hover:text-white w-full"
               onClick={Toggle}
               >Create Post</button>
              </Link>
              <button  className="hover:bg-slate-400 w-full text-left
              px-4 py-2  hover:text-white text-black" type="button" 
              onClick={()=>{signOut(); Toggle()}}  
              > Sign Out</button>
              <Link href={'Account/profile'}>
              <h1  className="hover:bg-slate-400 px-4 py-2 
               hover:text-white flex justify-between
                items-center text-black cursor-pointer"
                onClick={Toggle}
                > Account   <Image src={session?.user.image} width={40} height={40 } alt="profile" className="rounded-full"/></h1>
                </Link>
            </div>
            
          </>
        )}
      </div>
    </div>
  );
}

export default Nav;
