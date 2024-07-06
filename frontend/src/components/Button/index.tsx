import React from 'react'
interface ButtonProps extends React.PropsWithChildren {
    onClick?: () => void;
    className?: string; 
}

const Button: React.FC<ButtonProps> = ({children,onClick,className}) => {
  return (
    <button onClick={onClick} className={className}>{children}</button>
  )
}

export default Button