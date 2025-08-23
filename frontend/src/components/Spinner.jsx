import React from 'react'

const Spinner = () => {
  

  return (
    <>
   
      <div className="flex flex-col items-center justify-center min-h-screen">
              <h1 className="text-center py-10">Loading....</h1> 
        <div className=" spinner-5 relative animate-spin w-4 h-4 rounded-full bg-blue-500 ">
          <div className="absolute left-[-1.5rem] w-4 h-6 bg-black rounded-full"></div>
          <div className="absolute right-[-1.5rem] w-4 h-6 bg-black rounded-full"></div>
        </div>
          </div>
          
     </>
    
  );
};

export default Spinner;
