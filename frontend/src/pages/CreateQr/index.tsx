import React from 'react';
import useCreateGigDataForm from '../../hooks/useCreateGigDataForm';



const GigForm: React.FC = () => {

  const { create, formData, handleChange ,errors, loading} = useCreateGigDataForm()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await create()
      console.log("🚀 ~ handleSubmit ~ response:", response)
    } catch (error) {
      console.log("🚀 ~ handleSubmit ~ error:", error)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-xl mx-auto p-4 bg-white shadow-md rounded-md">
      {errors && <p className='text-sm p-2 font-semibold text-center'>{errors}</p>}
      <div className="mb-4">
        <label htmlFor="imageUrl" className="block text-gray-700">Image URL (*)</label>
        <input
          type="text"
          id="imageUrl"
          name="imageUrl"
          value={formData.imageUrl}
          required
          onChange={handleChange}
          className="mt-1 p-2 w-full border rounded-md focus:outline-none"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="profileLink" className="block text-gray-700">Profile Link</label>
        <input
          type="text"
          id="profileLink"
          name="profileLink"
          value={formData.profileLink}
          onChange={handleChange}
          className="mt-1 p-2 w-full border rounded-md focus:outline-none"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="username" className="block text-gray-700">Username (*)</label>
        <input
          type="text"
          id="username"
          name="username"
          value={formData.username}
          required
          onChange={handleChange}
          className="mt-1 p-2 w-full border rounded-md focus:outline-none"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="gigLink" className="block text-gray-700">Gig Link</label>
        <input
          type="text"
          id="gigLink"
          name="gigLink"
          value={formData.gigLink}
          onChange={handleChange}
          className="mt-1 p-2 w-full border rounded-md focus:outline-none"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="gigDescription" className="block text-gray-700">Gig Description</label>
        <textarea
          id="gigDescription"
          name="gigDescription"
          value={formData.gigDescription}
          onChange={handleChange}
          className="mt-1 p-2 w-full border rounded-md focus:outline-none"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="rating" className="block text-gray-700">Rating</label>
        <input
          type="text"
          id="rating"
          name="rating"
          value={formData.rating}
          onChange={handleChange}
          className="mt-1 p-2 w-full border rounded-md focus:outline-none"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="numberOfReviews" className="block text-gray-700">Number of Reviews</label>
        <input
          type="text"
          id="numberOfReviews"
          name="numberOfReviews"
          value={formData.numberOfReviews}
          onChange={handleChange}
          className="mt-1 p-2 w-full border rounded-md focus:outline-none"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="price" className="block text-gray-700">Price</label>
        <input
          type="text"
          id="price"
          name="price"
          value={formData.price}
          onChange={handleChange}
          className="mt-1 p-2 w-full border rounded-md focus:outline-none"
        />
      </div>
      <button disabled={loading} type="submit" className={`disabled:bg-blue-200 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none`}>
        Submit
      </button>
    </form>
  );
};

export default GigForm;
