import React from 'react'

interface ImageProps {
    src: string;
    alt?: string;
    className?: string;
}
const Image: React.FC<ImageProps> = ({src,alt,className}) => {
  return (
    <div className={`flex  ${className}`} >
        <img src={src} alt={alt}/>
    </div>
  )
}

export default Image