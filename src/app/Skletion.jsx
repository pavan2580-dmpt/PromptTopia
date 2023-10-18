import React from 'react'

function Skletion() {
  return (
    <>
    
    <div role="status" className="animate-pulse">
      <div className="w-[350px] flex items-center mb-2.5">
        <svg
          className="w-8 h-8 text-gray-200 dark:text-gray-700 mr-4"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z" />
        </svg>
        <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-700 w-[280px] mb-2.5 mx-auto"></div>
      </div>
      <div className="h-2.5 mx-auto bg-gray-300 rounded-full dark:bg-gray-700 max-w-[540px]"></div>
      <div className="h-2.5 mx-auto bg-gray-300 rounded-full dark:bg-gray-700 max-w-[540px] mt-5"></div>
      <div className="flex items-center justify-center mt-4">
        <div className="w-20 h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 mr-3"></div>
        <div className="w-24 h-2 bg-gray-200 rounded-full dark:bg-gray-700"></div>
      </div>
      <span className="sr-only">Loading...</span>
    </div>
    
    </>
  )
}

export default Skletion