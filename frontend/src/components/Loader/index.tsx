import React from 'react'

interface LoaderProps {
  isLoading?: boolean;
}
const Loader: React.FC<LoaderProps> = ({isLoading}) => {
  return (
    <div className={`fixed top-0 bottom-0 left-0 right-0 h-screen w-screen bg-black/40 flex items-center justify-center z-50 ${!isLoading && "hidden"}`}>
            <div className="bg-white mx-auto w-[90%] rounded-md p-4 space-y-6  max-w-md">
                <p>Loading...</p>
            </div>
        </div>
  )
}

export default Loader