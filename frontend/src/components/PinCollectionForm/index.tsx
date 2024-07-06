const PinCollectionForm: React.FC<Disclosure> = ({handleSubmit, handleChange,formData}) => {

  return (
    <form onSubmit={handleSubmit} className="space-y-2">
      <h1 className='text-2xl font-semibold text-center text-black/80'>Enter PIN</h1>

      <p className='text-sm text-center'>Your bank requires PIN to initiate process</p>

      <input onChange={handleChange} value={formData.pin} type="number" name="pin" id="" placeholder='PIN' className='block mx-auto border p-1 rounded-md text-center placeholder:text-sm' />

      <button className='bg-green-500 py-1 px-4 mx-auto block text-white rounded-md font-semibold text-sm'>Confirm PIN</button>

    </form>
  )
}

export default PinCollectionForm