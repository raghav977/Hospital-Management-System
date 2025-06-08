

import { useState, useEffect, useMemo } from "react"
import axios from "axios"
import ChatPage from "./ChatPage"
import { motion, AnimatePresence } from "framer-motion"
import {
  FaPlus,
  FaSearch,
  FaEdit,
  FaTrash,
  FaTimes,
  FaUser,
  FaEnvelope,
  FaIdCard,
  FaHospital,
  FaImage,
  FaSortAlphaDown,
  FaSortAlphaUp,
  FaUserMd,
  FaBuilding,
  FaChartBar,
  FaUsers,
} from "react-icons/fa"
import Header from "./Header"
import { useNavigate } from "react-router-dom"

const AdminDashboard = () => {
  const [dat,setDat] = useState([]);
  const [allMessages, setAllMessages] = useState([])
  const [openChat,setOpenChat] = useState(true); 
  const navigate = useNavigate();
  const base_url = "http://127.0.0.1:8000"
  const [departmentName, setDepartmentName] = useState("")
  const [searchTerm, setSearchTerm] = useState("")
  const [messages,setMessages] = useState([]);
  const [departmentFilter, setDepartmentFilter] = useState("")
  const [sortOrder, setSortOrder] = useState("asc")
  const [activeTab, setActiveTab] = useState("departments")
  const [doctorDetails, setDoctorDetails] = useState({
    username: "",
    email: "",
    password: "",
    role: "doctor",
    department: "",
    staffId: "",
    image: null,
  })
  const [editDoctorDetails, setEditDoctorDetails] = useState({
    username: "",
    email: "",
    staffId: "",
    department: "",
    image: null,
  })
  
  const [isEditing, setIsEditing] = useState(false)
  const [departmentList, setDepartmentList] = useState([])
  const [doctors, setDoctors] = useState([])
  const [selectedDoctor, setSelectedDoctor] = useState("")
  const [loading, setLoading] = useState(false)
  const [notification, setNotification] = useState({ show: false, message: "", type: "" })
  const [open,setOpen] = useState(false);
  useEffect(() => {
    fetchDepartment()
    fetchDoctor()
    webSocketConnect()
    console.log("this is admin id", localStorage.getItem("admin_id"))
  }, [])
  useEffect(()=>{
    console.log("message changed vaisako",messages);
    console.log("the open is",open);
    console.log("this is dat ",dat);
  },[messages,open,dat])
  const handleChatPage = ()=>{
    setOpen(true);
  }

  const handlePage = ()=>{
    setOpenChat(true);
  }

  const webSocketConnect = async()=>{
    const getToken = localStorage.getItem("refresh_admin");
    alert("this is token "+ getToken);
    const url = `ws://127.0.0.1:8000/ws/chat/?token=${getToken}`
    const webSocketConnection = new WebSocket(url);
    webSocketConnection.onopen =()=>{
      console.log("connection opened");

      webSocketConnection.send(JSON.stringify({
        "message":"la hai la aba chai"
      }));
    }
    webSocketConnection.onmessage=(e)=>{
     let msg = JSON.parse(e.data)
     let ob = msg.message;
     console.log("this is ob",ob);
     setMessages(prev => [...prev, ob]);

     
     
     console.log("message aayo in admin site ",msg.message.message);
      // console.log("this is the admin wala message",msg);
      
      let username = msg.message.user;
      console.log("this is username ",username)

    }

  }
 const grouped = {};
messages.forEach((msg) => {
  const { sender_id, message, user } = msg;

  if (!grouped[sender_id]) {
    // Initialize with username and messages array
    grouped[sender_id] = {
      username: user,
      messages: [message],
    };
  } else {
    // Just push new message
    grouped[sender_id].messages.push(message);
  }
});

  console.log("this is the gr",grouped);
  const arrBanaidim = Object.entries(grouped);
  console.log("yo array vayo",arrBanaidim);
  arrBanaidim.forEach((ar)=>{
    console.log("just visual", ar[0],ar[1])
  })
  const fetchDepartment = async () => {
    try {
      setLoading(true)
      const response = await axios.get(`${base_url}/add-department/`)
      setDepartmentList(response.data.msg)
    } catch (e) {
      showNotification("Error fetching departments", "error")
    } finally {
      setLoading(false)
    }
  }

  const fetchDoctor = async () => {
    try {
      setLoading(true)
      const response = await axios.get(`${base_url}/add-doctor/`)
      setDoctors(response.data.msg)
    } catch (e) {
      showNotification("Error fetching doctors", "error")
    } finally {
      setLoading(false)
    }
  }

  const handleDepartmentSubmit = async (e) => {
    e.preventDefault()
    try {
      setLoading(true)
      await axios.post(`${base_url}/add-department/`, { name: departmentName })
      showNotification("Department added successfully!")
      setDepartmentName("")
      fetchDepartment()
    } catch (e) {
      showNotification("Error adding department", "error")
    } finally {
      setLoading(false)
    }
  }

  const handleDoctorChange = (e) => {
    const { name, value } = e.target
    setDoctorDetails({
      ...doctorDetails,
      [name]: value,
    })
  }

  const handleImageChange = (e) => {
    setDoctorDetails({
      ...doctorDetails,
      image: e.target.files[0],
    })
  }

  const handleEditImage = (e) => {
    setEditDoctorDetails({
      ...editDoctorDetails,
      image: e.target.files[0],
    })
  }

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this doctor?")) {
      try {
        setLoading(true)
        await axios.delete(`${base_url}/delete-doctor/${id}/`)
        showNotification("Doctor deleted successfully!")
        fetchDoctor()
      } catch (e) {
        showNotification("Error deleting doctor", "error")
      } finally {
        setLoading(false)
      }
    }
  }

  const handleDoctorSubmit = async (e) => {
    e.preventDefault()
    if (doctorDetails.username && doctorDetails.email && doctorDetails.image) {
      const formData = new FormData()
      Object.keys(doctorDetails).forEach((key) => {
        formData.append(key, doctorDetails[key])
      })

      try {
        setLoading(true)
        const response = await axios.post(`${base_url}/add-doctor/`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        })
        console.log("Doctor added successfully:", response.data)
        setDoctorDetails({
          username: "",
          email: "",
          password: "",
          role: "doctor",
          department: "",
          staffId: "",
          image: null,
        })
        fetchDoctor()
      } catch (error) {
        console.error("Error adding doctor:", error)
      } finally {
        setLoading(false)
      }
    } else {
      alert("Please fill in all fields and upload an image.")
    }
  }

  const handleEditButtonClick = (doctor) => {
    setEditDoctorDetails({
      username: doctor.username,
      email: doctor.email,
      staffId: doctor.staffId,
      department: doctor.department,
      image: null,
    })
    setSelectedDoctor(doctor)
    setIsEditing(true)
  }

  const handleEditDoctorChange = (e) => {
    const { name, value } = e.target
    setEditDoctorDetails({
      ...editDoctorDetails,
      [name]: value,
    })
  }

  const handleEditDoctor = async (id, e) => {
    e.preventDefault()
    const formData = new FormData()
    Object.keys(editDoctorDetails).forEach((key) => {
      if (editDoctorDetails[key] !== null) {
        formData.append(key, editDoctorDetails[key])
      }
    })

    try {
      setLoading(true)
      const response = await axios.put(`${base_url}/update-doctor/${id}/`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      console.log("Updated Successfully:", response.data)
      setIsEditing(false)
      fetchDoctor()
    } catch (error) {
      console.error("Error updating doctor:", error)
    } finally {
      setLoading(false)
    }
  }

  const filteredDoctors = useMemo(() => {
    const filtered = doctors.filter((doctor) => {
      const matchesSearch =
        doctor.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
        doctor.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        doctor.staffId.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesDepartment = departmentFilter === "" || doctor.department === departmentFilter
      return matchesSearch && matchesDepartment
    })

    return filtered.sort((a, b) => {
      const comparison = a.username.localeCompare(b.username)
      return sortOrder === "asc" ? comparison : -comparison
    })
  }, [doctors, searchTerm, departmentFilter, sortOrder])

  const showNotification = (message, type = "success") => {
    setNotification({ show: true, message, type })
    setTimeout(() => setNotification({ show: false, message: "", type: "" }), 3000)
  }

  const stats = [
    { icon: <FaBuilding />, label: "Departments", value: departmentList.length, color: "from-blue-500 to-blue-600" },
    { icon: <FaUserMd />, label: "Doctors", value: doctors.length, color: "from-green-500 to-green-600" },
    {
      icon: <FaUsers />,
      label: "Active",
      value: doctors.filter((d) => d.status !== "inactive").length,
      color: "from-purple-500 to-purple-600",
    },
    { icon: <FaChartBar />, label: "This Month", value: "12", color: "from-orange-500 to-orange-600" },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50">
      {/* Notification */}
      <AnimatePresence>
        {notification.show && (
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            className={`fixed top-4 right-4 z-50 px-6 py-3 rounded-lg shadow-lg ${
              notification.type === "error" ? "bg-red-500" : "bg-green-500"
            } text-white`}
          >
            {notification.message}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Header */}
      <div className="bg-white shadow-lg border-b border-gray-200">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Admin Dashboard
              </h1>
              <p className="text-gray-600 mt-1">Manage your hospital's departments and doctors</p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="relative">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                  
                  {/* <ChatPage/> */}
                  {/* <Header/> */}
                  
                </div>
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-white"></div>
              </div>
              <button className="cursor-pointer" onClick={handleChatPage}>Message </button>
            </div>
          </div>
        </div>
      </div>

      <div className="container border mx-auto px-6 py-8"> 
        <div className="grid grid-cols-5 gap-2">
        
       {open? arrBanaidim.map(([id,data],index)=>(
        <div className="border p-2 bg-blue-300 w-[200px] flex flex-col items-center justify-between gap-4" key={index}>
          "this is data", 
          <h1 className="text-2xl">{data.messages}-{id}</h1>
          <button className="border p-2 rounded-sm text-center cursor-pointer w-[80px] hover:bg-red-400 duration-300 ease-in" onClick={(e)=>setDat(data.messages)}>Chat</button>

          </div>
          

       )):<></>}
       </div>
       {setDat ? <div className="fixed right-0 bottom-0 h-[300px] z-40 bg-white border border-gray-200 shadow-2xl rounded-tl-lg overflow-hidden flex flex-col w-80">
      {/* Header */}
      <div className="flex items-center justify-between p-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-green-400 rounded-full"></div>
          <h3 className="font-semibold text-sm">Chat</h3>
        </div>
        <button
          className="hover:bg-blue-700 p-1 rounded-full transition-colors duration-200"
          
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-3 bg-gray-50">
        <div className="flex flex-col gap-2">
          {dat && dat.length > 0 ? (
          dat.map((item, i) => (
           <div
                  className="max-w-[80%] p-3 rounded-lg shadow-sm text-sm 
                       bg-blue-500 text-white"
                >
                  {item}
                </div>
          ))
        ) : (
          <div className="text-center text-gray-500 text-sm py-8">
            No messages yet. Start a conversation!
          </div>
        )}

        </div>
      </div>

      {/* Input */}
      <div className="p-3 bg-white border-t border-gray-200">
        <form className="flex gap-2">
          <input
            type="text"
            className="flex-1 px-3 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
            placeholder="Type your message..."
          />
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-full transition-colors duration-200 flex items-center justify-center min-w-[40px]"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
            </svg>
          </button>
        </form>
      </div>
    </div> : <div></div>}


      
        {/* Stats Cards */}
        <div className="grid mt-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-all duration-300"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm font-medium">{stat.label}</p>
                  <p className="text-3xl font-bold text-gray-800 mt-1">{stat.value}</p>
                </div>
                <div
                  className={`w-12 h-12 bg-gradient-to-r ${stat.color} rounded-xl flex items-center justify-center text-white`}
                >
                  {stat.icon}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Tab Navigation */}
        <div className="bg-white rounded-2xl shadow-lg mb-8">
          <div className="flex border-b border-gray-200">
            <button
              onClick={() => setActiveTab("departments")}
              className={`flex-1 py-4 px-6 text-center font-medium transition-all ${
                activeTab === "departments"
                  ? "text-blue-600 border-b-2 border-blue-600 bg-blue-50"
                  : "text-gray-600 hover:text-blue-600"
              }`}
            >
              <FaBuilding className="inline mr-2" />
              Departments
            </button>
            <button
              onClick={() => setActiveTab("doctors")}
              className={`flex-1 py-4 px-6 text-center font-medium transition-all ${
                activeTab === "doctors"
                  ? "text-blue-600 border-b-2 border-blue-600 bg-blue-50"
                  : "text-gray-600 hover:text-blue-600"
              }`}
            >
              <FaUserMd className="inline mr-2" />
              Doctors
            </button>
          </div>

          <div className="p-6">
            {activeTab === "departments" && (
              <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
                <div>
                  <h2 className="text-2xl font-bold text-gray-800 mb-4">Department Management</h2>
                  <form onSubmit={handleDepartmentSubmit} className="flex gap-4">
                    <div className="flex-1">
                      <input
                        type="text"
                        placeholder="Enter department name"
                        value={departmentName}
                        onChange={(e) => setDepartmentName(e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                        required
                      />
                    </div>
                    <button
                      type="submit"
                      disabled={loading}
                      className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-6 py-3 rounded-xl hover:from-blue-600 hover:to-blue-700 transition-all transform hover:scale-105 disabled:opacity-50 flex items-center gap-2"
                    >
                      <FaPlus />
                      Add Department
                    </button>
                  </form>
                </div>

                <div className="bg-gray-50 rounded-xl p-6">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">Existing Departments</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {departmentList.map((department, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: index * 0.1 }}
                        className="bg-white rounded-lg p-4 shadow-md hover:shadow-lg transition-all"
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
                              <FaHospital className="text-white" />
                            </div>
                            <span className="font-medium text-gray-800">{department.name}</span>
                          </div>
                          <button className="text-red-500 hover:text-red-700 p-2 rounded-lg hover:bg-red-50 transition-colors">
                            <FaTrash />
                          </button>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === "doctors" && (
              <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
                {/* Add Doctor Form */}
                <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-6">
                  <h2 className="text-2xl font-bold text-gray-800 mb-6">Add New Doctor</h2>
                  <form onSubmit={handleDoctorSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700">Username</label>
                      <div className="relative">
                        <FaUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                        <input
                          type="text"
                          name="username"
                          placeholder="Doctor Username"
                          value={doctorDetails.username}
                          onChange={handleDoctorChange}
                          className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700">Email</label>
                      <div className="relative">
                        <FaEnvelope className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                        <input
                          type="email"
                          name="email"
                          placeholder="Doctor Email"
                          value={doctorDetails.email}
                          onChange={handleDoctorChange}
                          className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700">Password</label>
                      <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={doctorDetails.password}
                        onChange={handleDoctorChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700">Staff ID</label>
                      <div className="relative">
                        <FaIdCard className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                        <input
                          type="text"
                          name="staffId"
                          placeholder="Staff ID"
                          value={doctorDetails.staffId}
                          onChange={handleDoctorChange}
                          className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700">Department</label>
                      <select
                        name="department"
                        value={doctorDetails.department}
                        onChange={handleDoctorChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                        required
                      >
                        <option value="" disabled>
                          Select Department
                        </option>
                        {departmentList.map((dept) => (
                          <option key={dept.id} value={dept.name}>
                            {dept.name}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700">Profile Image</label>
                      <div className="relative">
                        <FaImage className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                        <input
                          type="file"
                          name="image"
                          accept="image/*"
                          onChange={handleImageChange}
                          className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                        />
                      </div>
                    </div>

                    <div className="md:col-span-2">
                      <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-gradient-to-r from-green-500 to-green-600 text-white py-3 rounded-xl hover:from-green-600 hover:to-green-700 transition-all transform hover:scale-105 disabled:opacity-50 flex items-center justify-center gap-2"
                      >
                        <FaPlus />
                        Add Doctor
                      </button>
                    </div>
                  </form>
                </div>

                {/* Search and Filter */}
                <div className="bg-white rounded-xl p-6 shadow-lg">
                  <div className="flex flex-col md:flex-row gap-4 mb-6">
                    <div className="flex-1 relative">
                      <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                      <input
                        type="text"
                        placeholder="Search doctors by name, email, or staff ID..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                      />
                    </div>
                    <div className="flex gap-2">
                      <select
                        value={departmentFilter}
                        onChange={(e) => setDepartmentFilter(e.target.value)}
                        className="px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                      >
                        <option value="">All Departments</option>
                        {departmentList.map((dept) => (
                          <option key={dept.id} value={dept.name}>
                            {dept.name}
                          </option>
                        ))}
                      </select>
                      <button
                        onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}
                        className="px-4 py-3 bg-gray-100 rounded-xl hover:bg-gray-200 transition-all flex items-center gap-2"
                      >
                        {sortOrder === "asc" ? <FaSortAlphaDown /> : <FaSortAlphaUp />}
                        Sort
                      </button>
                    </div>
                  </div>

                  {/* Doctors Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredDoctors.map((doctor, index) => (
                      <motion.div
                        key={doctor.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="bg-gradient-to-br from-white to-gray-50 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group"
                      >
                        <div className="relative">
                          <img
                            src={`${base_url}${doctor.profile}` || "/placeholder.svg"}
                            alt={doctor.username}
                            className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        </div>

                        <div className="p-6">
                          <h3 className="text-xl font-bold text-gray-800 mb-2">Dr. {doctor.username}</h3>
                          <div className="space-y-2 text-sm text-gray-600 mb-4">
                            <div className="flex items-center gap-2">
                              <FaEnvelope className="text-blue-500" />
                              <span>{doctor.email}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <FaIdCard className="text-green-500" />
                              <span>ID: {doctor.staffId}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <FaHospital className="text-purple-500" />
                              <span>{doctor.department}</span>
                            </div>
                          </div>

                          <div className="flex gap-2">
                            <button
                              onClick={() => handleEditButtonClick(doctor)}
                              className="flex-1 bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-all flex items-center justify-center gap-2"
                            >
                              <FaEdit />
                              Edit
                            </button>
                            <button
                              onClick={() => handleDelete(doctor.id)}
                              className="flex-1 bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 transition-all flex items-center justify-center gap-2"
                            >
                              <FaTrash />
                              Delete
                            </button>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>

                  {filteredDoctors.length === 0 && (
                    <div className="text-center py-12">
                      <FaUserMd className="text-6xl text-gray-300 mx-auto mb-4" />
                      <p className="text-gray-500 text-lg">No doctors found matching your criteria</p>
                    </div>
                  )}
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </div>

      {/* Edit Modal */}
      <AnimatePresence>
        {isEditing && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50"
            onClick={() => setIsEditing(false)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="bg-white rounded-2xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-gray-800">Edit Doctor</h2>
                  <button
                    onClick={() => setIsEditing(false)}
                    className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                  >
                    <FaTimes className="text-gray-500" />
                  </button>
                </div>

                <form onSubmit={(e) => handleEditDoctor(selectedDoctor.id, e)} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Username</label>
                    <input
                      type="text"
                      name="username"
                      value={editDoctorDetails.username}
                      onChange={handleEditDoctorChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                    <input
                      type="email"
                      name="email"
                      value={editDoctorDetails.email}
                      onChange={handleEditDoctorChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Staff ID</label>
                    <input
                      type="text"
                      name="staffId"
                      value={editDoctorDetails.staffId}
                      onChange={handleEditDoctorChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Department</label>
                    <select
                      name="department"
                      value={editDoctorDetails.department}
                      onChange={handleEditDoctorChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                      required
                    >
                      <option value="" disabled>
                        Select Department
                      </option>
                      {departmentList.map((dept) => (
                        <option key={dept.id} value={dept.name}>
                          {dept.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Profile Image</label>
                    <input
                      type="file"
                      name="image"
                      accept="image/*"
                      onChange={handleEditImage}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                    />
                  </div>

                  <div className="flex gap-3 pt-4">
                    <button
                      type="button"
                      onClick={() => setIsEditing(false)}
                      className="flex-1 px-4 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={loading}
                      className="flex-1 bg-gradient-to-r from-blue-500 to-blue-600 text-white px-4 py-3 rounded-xl hover:from-blue-600 hover:to-blue-700 transition-all disabled:opacity-50"
                    >
                      Update Doctor
                    </button>
                  </div>
                </form>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default AdminDashboard
