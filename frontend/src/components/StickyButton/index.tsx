import React from 'react'
import VerifyButton, { ButtonProps } from '../Button/VerifyButton'

const StickyButton: React.FC<ButtonProps> = (props) => {
    return (
        <div className="sticky bottom-0 left-0 right-0 w-full inset-x-0 mx-auto p-2 bg-gray-50 border-t border-gray-100">
            <VerifyButton {...props}/>
        </div>
    )
}

export default StickyButton