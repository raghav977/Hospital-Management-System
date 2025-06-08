// Ninedoctors.js

"use client"

import { useEffect, useState, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import axios from "axios"
import { FaUser, FaIdCard, FaHospital, FaTimes, FaCalendarAlt } from "react-icons/fa"

const Ninedoctors = () => {
  const [doctors, setDoctors] = useState([])
  const [departments, setDepartments] = useState([])
  const [selectedDepartment, setSelectedDepartment] = useState("")
  const [showForm, setShowForm] = useState(false)
  const [selectedDoctor, setSelectedDoctor] = useState()
  const [loading, setLoading] = useState(true)
  const [isVisible, setIsVisible] = useState(true);
  const sectionRef = useRef(null)
  const [appointmentData, setAppointmentData] = useState({
    patient_name: "",
    contact_number: "",
    address: "",
    appointment_date: "",
    reason: "",
  })

  useEffect(() => {
    console.log("Ninedoctors useEffect (fetchDoctors) mounted/updated.");
    fetchDoctors();
  }, [selectedDepartment]); 

  const fetchDoctors = async () => {
    console.log("fetchDoctors called.");
    try {
      setLoading(true);
      let url = "http://127.0.0.1:8000/add-doctor/";
      if (selectedDepartment) {
        url += `?department=${selectedDepartment}`;
      }
      console.log("Fetching doctors from URL:", url);
      const response = await axios.get(url);
      console.log("Doctors API response:", response.data);
      setDoctors(response.data.msg.slice(0, 9) || []);
      console.log("Doctors state updated. Number of doctors:", (response.data.msg || []).slice(0, 9).length);
    } catch (error) {
      console.error("Error fetching doctors:", error.response?.data || error);
    } finally {
      setLoading(false);
      console.log("setLoading(false) called.");
    }
  };








  const handleInputChange = (e) => {
    setAppointmentData({ ...appointmentData, [e.target.name]: e.target.value })
  }

  const handleBookAppointment = (doctor) => {
    console.log("handleBookAppointment clicked for doctor:", doctor);
    setSelectedDoctor(doctor)
    setShowForm(true)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!selectedDoctor) {
      console.error("No doctor selected for appointment.");
      return;
    }

    const appointmentDetails = {
      ...appointmentData,
      department: selectedDoctor.department,
      doctor: selectedDoctor.username,
    }
    console.log("Submitting appointment with details:", appointmentDetails);

    try {
      const response = await axios.post("http://127.0.0.1:8000/book-appointment/", appointmentDetails)
      alert("Appointment booked successfully!")
      setShowForm(false)
      setAppointmentData({
        patient_name: "",
        contact_number: "",
        address: "",
        appointment_date: "",
        reason: "",
      })
      console.log("Appointment booked successfully. Response:", response.data);
    } catch (error) {
      console.error("Error booking appointment:", error.response?.data || error);
      alert(`Error booking appointment: ${error.response?.data?.detail || error.message}`);
    }
  }

  const closeModal = () => {
    console.log("Closing modal.");
    setShowForm(false)
    setAppointmentData({
      patient_name: "",
      contact_number: "",
      address: "",
      appointment_date: "",
      reason: "",
    })
  }

  // Animation variants remain the same
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1,
      },
    },
  }

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  }

  const modalVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.3,
        ease: "easeOut",
      },
    },
    exit: {
      opacity: 0,
      scale: 0.8,
      transition: {
        duration: 0.2,
      },
    },
  }

  const backdropVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
    exit: { opacity: 0 },
  }

  // IMPORTANT: This loading state check
  if (loading) {
    console.log("Rendering loading spinner.");
    return (
      <div className="container mx-auto p-4">
        <div className="flex bg-red-50 justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      </div>
    )
  }

  // Main render
  console.log("Rendering Ninedoctors component. isVisible:", isVisible, "Doctors count:", doctors.length);
  return (
    <section ref={sectionRef} className="py-16 bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            Meet Our <span className="text-blue-600">Expert Doctors</span>
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Our team of experienced healthcare professionals is dedicated to providing you with the best medical care.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          // This is the key: it depends on `isVisible`
          animate={isVisible ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {doctors.map((doctor, index) => (
            <motion.div key={doctor.id} variants={cardVariants} className="group">
              <div className="bg-white rounded-2xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-2xl hover:-translate-y-2">
                <div className="relative overflow-hidden">
                  <img
                    src={`http://127.0.0.1:8000${doctor.profile}` || "/placeholder.svg"}
                    alt={`${doctor.username}'s profile`}
                    className="w-full h-80 object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>

                <div className="p-6">
                  <div className="space-y-3 mb-6">
                    <div className="flex items-center gap-3">
                      <FaUser className="text-blue-500 text-sm" />
                      <p className="text-gray-700 font-medium">Dr. {doctor.username}</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <FaIdCard className="text-green-500 text-sm" />
                      <p className="text-gray-600">ID: {doctor.staffid}</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <FaHospital className="text-purple-500 text-sm" />
                      <p className="text-gray-600">{doctor.department}</p>
                    </div>
                  </div>

                  <button
                    className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-md hover:shadow-lg"
                    onClick={() => handleBookAppointment(doctor)}
                  >
                    <FaCalendarAlt className="inline mr-2" />
                    Book Appointment
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Modal */}
        <AnimatePresence>
          {showForm && (
            <motion.div
              variants={backdropVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50"
              onClick={closeModal}
            >
              <motion.div
                variants={modalVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="bg-white rounded-2xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-bold text-gray-800">Book Appointment</h2>
                    <button onClick={closeModal} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                      <FaTimes className="text-gray-500" />
                    </button>
                  </div>

                  {selectedDoctor && (
                    <div className="bg-blue-50 rounded-lg p-4 mb-6">
                      <p className="text-sm text-gray-600">Booking appointment with:</p>
                      <p className="font-semibold text-gray-800">Dr. {selectedDoctor.username}</p>
                      <p className="text-sm text-gray-600">{selectedDoctor.department}</p>
                    </div>
                  )}

                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Patient Name</label>
                      <input
                        type="text"
                        name="patient_name"
                        placeholder="Enter patient name"
                        value={appointmentData.patient_name}
                        onChange={handleInputChange}
                        required
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Contact Number</label>
                      <input
                        type="tel"
                        name="contact_number"
                        placeholder="Enter contact number"
                        value={appointmentData.contact_number}
                        onChange={handleInputChange}
                        required
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Address</label>
                      <input
                        type="text"
                        name="address"
                        placeholder="Enter address"
                        value={appointmentData.address}
                        onChange={handleInputChange}
                        required
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Appointment Date</label>
                      <input
                        type="date"
                        name="appointment_date"
                        value={appointmentData.appointment_date}
                        onChange={handleInputChange}
                        required
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Reason for Appointment</label>
                      <textarea
                        name="reason"
                        placeholder="Describe your symptoms or reason for visit"
                        value={appointmentData.reason}
                        onChange={handleInputChange}
                        required
                        rows={3}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
                      />
                    </div>

                    <div className="flex gap-3 pt-4">
                      <button
                        type="button"
                        onClick={closeModal}
                        className="flex-1 px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="flex-1 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white px-4 py-3 rounded-lg transition-all transform hover:scale-105"
                      >
                        Confirm Appointment
                      </button>
                    </div>
                  </form>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}

export default Ninedoctors