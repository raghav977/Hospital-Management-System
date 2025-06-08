import React, { useState } from 'react';
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode'

const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const navigate = useNavigate();

  

  const handleLogin = async(e) => {
    e.preventDefault();
    if (!email || !password) {
      setError('Please fill in all fields');
      return;
    }
    try{
        const response = await axios.post("http://127.0.0.1:8000/login-admin/",{
            email,
            password
        })
        console.log("this is response",response);
        localStorage.setItem("admin_token",response.data.access_token);
        localStorage.setItem("refresh_admin",response.data.refresh_token);
        localStorage.setItem("user","admin");
        let refreshtoken = response.data.refresh
        let decodetoken = jwtDecode(refreshtoken)
        localStorage.setItem("admin_id",decodetoken.user_id);
        navigate("/admin-dashboard");
        

    }
    catch(e){

        console.log("this is error",e)
    }
    setError('');
    console.log('Logging in with:', email, password);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white rounded-2xl shadow-lg">
        <h2 className="text-2xl font-bold text-center text-gray-800">Admin Login</h2>
        <p className="text-center text-gray-500 mb-6">Sign in to your admin dashboard</p>
        
        {error && <p className="text-red-500 text-center text-sm mb-4">{error}</p>}

        <form onSubmit={handleLogin} className="space-y-4">
          {/* Email Field */}
          <div>
            <label className="block text-gray-600 font-medium">Email</label>
            <input
              type="email"
              className="w-full px-4 py-3 mt-1 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
              placeholder="admin@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          {/* Password Field */}
          <div>
            <label className="block text-gray-600 font-medium">Password</label>
            <input
              type="password"
              className="w-full px-4 py-3 mt-1 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
              placeholder="********"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-3 mt-4 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition shadow-md"
          >
            Login
          </button>
        </form>

        {/* Forgot Password */}
        <p className="text-center text-gray-500 text-sm mt-4">
          Forgot password? <a href="#" className="text-blue-600 hover:underline">Reset here</a>
        </p>
      </div>
    </div>
  );
};

export default AdminLogin;
