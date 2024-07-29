import React from 'react'
import Image from '../../../../components/Image'
import Visa from "../../../../assets/visa.svg"


const GigCard: React.FC<{gig: GetGigData}> = ({gig}) => {
  return (<div key={gig.gigId} className='border border-gray-200 p-4 bg-slate-50 m-4 space-y-3 rounded-md'>
    <div className='flex justify-between items-center flex-wrap'>
        <div className='flex items-center gap-x-2 justify-start flex-1'>
            <Image src={gig.imageUrl} className='w-[10%] rounded-full object-cover overflow-hidden' alt={gig.username} />
            <div>
                <p className='font-semibold flex items-center justify-start gap-x-2'>
                    {gig.username}
                    <a href={gig.profileLink} target="_blank" rel="noopener noreferrer" className='font-semibold text-xs text-green-500'>Visit Page</a>
                </p>
                <p className='text-sm text-gray-500'>ID: {gig.gigId}</p>
            </div>
        </div>

        <Image src={Visa} className='w-[5%] object-cover overflow-hidden' alt={gig.username} />
    </div>

    <p className='line-clamp-3'>{gig.gigDescription}</p>
    <p className='line-clamp-2 bg-red-50 m-4 mx-auto p-3 rounded-md text-sm text-red-500'>
        {gig.gigMessage}
    </p>
    <div className='flex items-center justify-start gap-x-2'>
        <p className='text-sm'>Rating: <span className=' font-semibold'>{gig.rating}</span></p>
        <p className='text-sm'>Price: <span className=' font-semibold'>{gig.price}</span></p>
    </div>
</div>
  )
}

export default GigCard