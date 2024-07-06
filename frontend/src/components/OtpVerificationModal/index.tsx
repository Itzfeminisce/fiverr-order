const OtpVerificationModal: React.FC<Disclosure> = ({handleSubmit, handleChange, formData}) => {

  return (
    <form onSubmit={handleSubmit}>
      <h1 className='text-2xl font-semibold text-center text-black/80'>Enter SMS code</h1>

      <p className='text-sm text-center'>A one-time SMS code has been sent to your phone</p>

      <input onChange={handleChange} value={formData.otp_code} type="number" name="otp_code" id="" placeholder='One-time SMS code' className='block mx-auto border p-1 rounded-md text-center placeholder:text-sm' />

      <button className='bg-green-500 py-1 px-4 mx-auto block text-white rounded-md font-semibold text-sm'>Submit</button>

    </form>
  )
}

export default OtpVerificationModal