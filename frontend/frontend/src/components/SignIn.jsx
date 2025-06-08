

import { useEffect, useState } from "react"
import sign from "../assets/signin.png"
import { MdOutlineManageAccounts } from "react-icons/md"
import { RiLockPasswordFill } from "react-icons/ri"
import { useNavigate } from "react-router-dom"
import { jwtDecode } from 'jwt-decode'
import axios from "axios"

export const SignIn = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [message, setMessage] = useState("")
  const [isVisible, setIsVisible] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {

    setIsVisible(true)
  }, [])

  const signIn = async (e) => {
    e.preventDefault()
    try {
      const response = await axios.post("http://127.0.0.1:8000/login-user/", {
        email: email,
        password: password,
      })
      console.log("this is response", response)
      localStorage.setItem("access_token", response.data.access)
      localStorage.setItem("refresh_token", response.data.refresh)
      let refreshtoken = response.data.refresh
      let decodetoken = jwtDecode(refreshtoken)
      console.log("this is decoded token", decodetoken.user_id);
      localStorage.setItem("user_id",decodetoken.user_id);
      localStorage.setItem("user", "patient")
      alert("user loged in")

      navigate("/home")

      console.log("api respone", response)
    } catch (err) {
      console.log("error", err)
      console.log(err.response.data.error)
      setMessage(err.response.data.error)

      if (err.response && err.response.data) {
      } else {
        console.log("Something went wrong, please try again after few minutes")
      }
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
            src={sign || "/placeholder.svg"}
            alt="Sign in illustration"
            className="max-w-full h-auto object-contain transition-all duration-700 ease-in-out transform hover:scale-105"
          />
        </div>

        {/* Form Section */}
        <div className="md:w-1/2 p-8">
          <div className="space-y-2 mb-6">
            <h2 className="text-3xl font-bold text-gray-800 transition-all duration-300 ease-in-out">Welcome Back</h2>
            <p className="text-gray-600">Please sign in to continue to your account</p>
          </div>

          <form className="space-y-4" onSubmit={signIn}>
            {/* Email Input */}
            <div className="group">
              <div className="flex items-center border-2 border-gray-200 rounded-lg p-3 transition-all duration-300 focus-within:border-blue-500 focus-within:shadow-sm">
                <MdOutlineManageAccounts className="text-2xl text-gray-400 group-focus-within:text-blue-500" />
                <input
                  type="text"
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
                  onChange={(e) => setPassword(e.target.value)}
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
              Sign In
            </button>

            {/* Sign Up Link */}
            <div className="text-center mt-4">
              <p className="text-gray-600">
                Don't have an account?{" "}
                <a href="/" className="text-blue-500 hover:text-blue-700 font-medium transition-colors duration-300">
                  Sign Up
                </a>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default SignIn
