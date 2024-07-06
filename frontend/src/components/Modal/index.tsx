import React, { PropsWithChildren} from 'react'


const Modal: React.FC<PropsWithChildren> = ({ children }) => {
    return (
            <div className={`fixed top-0 left-0 right-0 bottom-0 h-screen w-screen bg-black/40 flex items-center justify-center`}>
                {/* <button className='text-white font-semibold absolute right-10 top-10 text-2xl'>&times;</button> */}
                <div className="bg-white mx-auto w-[90%] max-h-[90%] overflow-x-hidden overflow-y-scroll rounded-md p-4 space-y-6 max-w-screen-sm">
                    {children}
                </div>
            </div>
    )
}
export default Modal