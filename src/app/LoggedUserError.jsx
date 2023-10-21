import React from 'react'

function LoggedUserError() {
  return (
    <>
    
    <div className="w-full max-w-[570px] rounded-[20px] bg-white py-12 px-8 text-center md:py-[60px] md:px-[70px] ">
  <h3 className="text-gray-900 pb-2 text-xl font-bold sm:text-2xl">You can't access this page</h3>
  <span className="bg-blue-500 mx-auto mb-6 inline-block h-1 w-[90px] rounded"></span>
  <p className="text-gray-500 mb-10 text-base leading-relaxed">Only loged user have the rights or permissions to create a post.In order to create a post in PromptTopia you need to have a account. <span className='text-blue-300 underline'> "Please Login and try" </span></p>
  <div className="flex flex-wrap gap-4">

    <div className="flex-1">
      <button className="bg-blue-500 whitespace-nowrap border-blue-500 block w-full rounded-lg border p-3 text-center text-base font-medium text-white transition hover:bg-opacity-90">View Details</button>
    </div>
  </div>
</div>
    </>
  )
}

export default LoggedUserError