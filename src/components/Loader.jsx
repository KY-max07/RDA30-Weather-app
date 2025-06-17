import React, { useState } from 'react'

const Loader = () => {
    const [isLoading, setIsLoading] = useState(false);
  return (
    <div className={`w-screen h-screen  bg-black  relative  ${isLoading?"hidden":"block"}`}>
        
        <div className='w-10 h-10 border-t-2 border-b-2 border-white rounded-full animate-spin absolute bottom-5 right-5.5'></div>
        
       <div className='w-screen h-[90vh] flex flex-col items-center justify-center gap-6'>
       <h1 className='doto text-9xl text-white'>Whether App</h1>
       <button onClick={() => setIsLoading(true)} className='z-100  bg-white rounded hover:bg-white/80 text-neutral-900 px-5 py-1 doto font-bold'>Ready to fetch data...</button>
       </div>
    </div>
  )
}

export default Loader