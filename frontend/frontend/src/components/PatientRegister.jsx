

import { useState, useEffect } from "react"
import signup from "../assets/signup.png"
import { MdOutlineManageAccounts } from "react-icons/md"
import { RiLockPasswordFill } from "react-icons/ri"
import { CiUser } from "react-icons/ci"
import { GiConfirmed } from "react-icons/gi"
import axios from "axios"
import { useNavigate } from "react-router-dom"

export const PatientRegister = () => {
  const [email, setEmail] = useState("")
  const [username, setUsername] = useState("")
  const [password1, setPassword1] = useState("")
  const [password2, setPassword2] = useState("")
  const [staff_id, setStaff_id] = useState("")
  const [message, setMessage] = useState("")
  const [isVisible, setIsVisible] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    // Animation effect on mount
    setIsVisible(true)
  }, [])

  const signUp = async (e) => {
    e.preventDefault()
    try {
      const response = await axios.post("http://127.0.0.1:8000/create-patient/", {
        email,
        username,
        password: password1,
        role: "patient",
      })
      console.log(response)
      setMessage("user registered successfully")
      navigate("/signin")
    } catch (e) {
      console.log("this is", e.response.data)
      setMessage(e.response.data.msg)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white flex items-center justify-center p-4">
      <div
        className={`max-w-6xl w-full bg-white rounded-2xl shadow-xl overflow-hidden flex flex-col md:flex-row transition-all duration-700 ease-in-out transform ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
      >
        {/* Image Section */}
        <div className="md:w-1/2 bg-blue-100 p-6 flex items-center justify-center transition-all duration-700 ease-in-out">
          <img
            src={signup || "/placeholder.svg"}
            alt="Sign up illustration"
            className="max-w-full h-auto object-contain transition-all duration-700 ease-in-out transform hover:scale-105"
          />
        </div>

        {/* Form Section */}
        <div className="md:w-1/2 p-8">
          <div className="space-y-2 mb-6">
            <h2 className="text-3xl font-bold text-gray-800 transition-all duration-300 ease-in-out">Create Account</h2>
            <p className="text-gray-600">Please register to continue to our platform</p>
          </div>

          <form className="space-y-4" onSubmit={signUp}>
            {/* Username Input */}
            <div className="group">
              <div className="flex items-center border-2 border-gray-200 rounded-lg p-3 transition-all duration-300 focus-within:border-blue-500 focus-within:shadow-sm">
                <CiUser className="text-2xl text-gray-400 group-focus-within:text-blue-500" />
                <input
                  type="text"
                  placeholder="Username"
                  required
                  className="outline-none w-full ml-3 text-gray-700"
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
            </div>

            {/* Email Input */}
            <div className="group">
              <div className="flex items-center border-2 border-gray-200 rounded-lg p-3 transition-all duration-300 focus-within:border-blue-500 focus-within:shadow-sm">
                <MdOutlineManageAccounts className="text-2xl text-gray-400 group-focus-within:text-blue-500" />
                <input
                  type="email"
                  placeholder="E-mail"
                  required
                  className="outline-none w-full ml-3 text-gray-700"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>

            {/* Password Input */}
            <div className="group">
              <div className="flex items-center border-2 border-gray-200 rounded-lg p-3 transition-all duration-300 focus-within:border-blue-500 focus-within:shadow-sm">
                <RiLockPasswordFill className="text-2xl text-gray-400 group-focus-within:text-blue-500" />
                <input
                  type="password"
                  placeholder="Password"
                  required
                  className="outline-none w-full ml-3 text-gray-700"
                  onChange={(e) => setPassword1(e.target.value)}
                />
              </div>
            </div>

            {/* Confirm Password Input */}
            <div className="group">
              <div className="flex items-center border-2 border-gray-200 rounded-lg p-3 transition-all duration-300 focus-within:border-blue-500 focus-within:shadow-sm">
                <GiConfirmed className="text-2xl text-gray-400 group-focus-within:text-blue-500" />
                <input
                  type="password"
                  placeholder="Confirm Password"
                  required
                  className="outline-none w-full ml-3 text-gray-700"
                  onChange={(e) => setPassword2(e.target.value)}
                />
              </div>
            </div>

            {/* Error Message */}
            {message && (
              <div className="text-center p-3 rounded-lg bg-red-50 text-red-500 font-medium animate-fadeIn">
                {message}
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-4 rounded-lg transition-all duration-300 transform hover:translate-y-[-2px] hover:shadow-lg"
            >
              Create Account
            </button>

            {/* Sign In Link */}
            <div className="text-center mt-4">
              <p className="text-gray-600">
                Already have an account?{" "}
                <a
                  href="/signin"
                  className="text-blue-500 hover:text-blue-700 font-medium transition-colors duration-300"
                >
                  Sign In
                </a>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default PatientRegister
