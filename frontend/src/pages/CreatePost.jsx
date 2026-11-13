import axios from 'axios'
import {useNavigate} from 'react-router-dom'
import {useEffect, useState} from 'react'

function CreatePost() {

  const navigate = useNavigate()
  const [imagePreview, setImagePreview] = useState(null)

  const handleImageChange = (e) => {
    const file = e.target.files?.[0]
    setImagePreview(file ? URL.createObjectURL(file) : null)
  }

  useEffect(() => {
    return () => {
      if (imagePreview) {
        URL.revokeObjectURL(imagePreview)
      }
    }
  }, [imagePreview])

  const handlePost = async (e) => {
    e.preventDefault()

    const formData = new FormData(e.target)


    axios.post("http://localhost:3000/create-post", formData)
      .then(() => {
        // alert("Post created successfully")
        navigate("/feed")
      })
      .catch((err) => {
        console.log(err)
        alert("Error creating post")
      })

  }
  return (
    <section className="min-h-screen bg-gray-100 flex items-center justify-center p-3 sm:p-4">
      <div className="w-full max-w-4xl bg-white rounded-xl shadow-xl overflow-hidden flex flex-col lg:flex-row">

        {/* Left Side - Image Preview */}
        <div className="w-full lg:w-1/2 h-56 sm:h-64 md:h-72 lg:h-auto bg-gray-200 flex items-center justify-center">
          <img
            src={imagePreview || "https://placehold.co/600x600?text=Image+Preview"}
            alt="Preview"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Right Side - Form */}
        <div className="w-full lg:w-1/2 p-5 sm:p-6 lg:p-8 flex flex-col justify-center">
          <h1 className="text-xl sm:text-2xl font-bold mb-5 lg:mb-6 text-center">
            Create Post
          </h1>

          <form className="space-y-4" onSubmit={handlePost}>
            <label className="w-full flex items-center justify-center bg-indigo-600 text-white py-2.5 rounded-lg cursor-pointer hover:bg-indigo-700 transition">
              Choose Image
              <input
                type="file"
                name="image"
                accept="image/*"
                className="hidden"
                required
                onChange={handleImageChange}
              />
            </label>

            <textarea
              rows="4"
              name="caption"
              placeholder="Write your caption..."
              className="w-full border rounded-lg p-3 outline-none focus:ring-2 focus:ring-indigo-500 resize-none"
            ></textarea>

            <button
              type="submit"
              className="w-full bg-green-600 hover:bg-green-700 text-white py-2.5 rounded-lg font-semibold transition"
            >
              Create Post
            </button>
          </form>
        </div>

      </div>
    </section>
  )
}

export default CreatePost
