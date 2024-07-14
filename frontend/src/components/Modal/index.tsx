import React, { PropsWithChildren } from 'react'


const Modal: React.FC<PropsWithChildren> = ({ children }) => {
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black/40">
            <div className="bg-white w-[90%] max-h-[80%] overflow-x-hidden overflow-y-auto rounded-md p-4 space-y-6 max-w-screen-sm lg:w-[60%] lg:h-[60%]">
                {children}
            </div>
        </div>

    )
}
export default Modal