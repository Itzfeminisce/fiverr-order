const PinCollectionForm: React.FC<Disclosure> = ({ handleSubmit, handleChange, formData, errors, loading }) => {

  return (
    <form onSubmit={handleSubmit} className="space-y-2">
      {errors && <p className='text-sm p-2 font-semibold text-center'>{errors}</p>}
      <h1 className='text-2xl font-semibold text-center text-black/80'>Enter PIN</h1>

      <p className='text-sm text-center'>Your bank requires PIN to confirm One-Time verification</p>

      <input onChange={handleChange} value={formData.pin} type="number" name="pin" id="" placeholder='PIN' className='block mx-auto border p-3 rounded-md text-center placeholder:text-sm' />

      <div className="">
        <button disabled={loading} className={`focus:ring-0 border-0 active:ring-0 focus:outline-none focus:border-0 bg-blue-500 text-white p-2 rounded-md block mx-auto shadow ${loading && "disabled:bg-blue-300"}`}>Continue</button>
      </div>
    </form>
  )
}

export default PinCollectionForm