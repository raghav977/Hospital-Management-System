import { useState } from "react";
import axios from "axios";
import {useNavigate} from 'react-router-dom'
const DoctorSignin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(""); // Clear previous errors
    setLoading(true); // Start loading

    try {
      const response = await axios.post("http://127.0.0.1:8000/doctor-login/", {
        email,
        password
      });
      console.log("response", response);


      localStorage.setItem("doctorUsername", response.data.doctor_username);
      localStorage.setItem("staffId", response.data.staff_id);
      localStorage.setItem("token", response.data.access_token);
      localStorage.setItem("user","doctor");
      localStorage.setItem("id",response.data.doctor_id);
      navigate("/dashboard")
      

    } catch (err) {
      console.log("this is",err.response.data.error);
      setError(err.response.data.error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center text-blue-700">
          Doctor Login
        </h2>
        {error && <p className="text-red-500 mb-4 text-center">{error}</p>}
        <form onSubmit={handleLogin} className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            className={`bg-blue-500 text-white p-3 rounded-md hover:bg-blue-600 transition duration-300 ${
              loading ? "opacity-50 cursor-not-allowed" : ""
            }`}
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default DoctorSignin;