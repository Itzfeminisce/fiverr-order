import Image from '../Image'
import ArrowRight from "../../assets/arrow-right.svg"
import React from 'react';

export interface ButtonProps {
  className?: string;
  handleClick?: () => void;
}

const VerifyButton: React.FC<ButtonProps> = ({ handleClick}) => {
  return (
    <button onClick={handleClick} className="flex items-center justify-center p-2 bg-black text-white font-semibold w-full text-center rounded-md">
      <span className="flex-1">Verify</span>
      <Image src={ArrowRight} className="w-8" />
    </button>
  )
}

export default VerifyButton