import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
const OurDoctors = () => {
  const [doctors, setDoctors] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [selectedDepartment, setSelectedDepartment] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [selectedDoctor, setSelectedDoctor] = useState();
  const [appointmentData, setAppointmentData] = useState({
    patient_name: "",
    contact_number: "",
    address: "",
    appointment_date: "",
    reason: "",
  });

  useEffect(() => {
    fetchDoctors();
    fetchDepartments();
  }, [selectedDepartment]);

  const fetchDoctors = async () => {
    try {
      let url = "http://127.0.0.1:8000/add-doctor/";
      if (selectedDepartment) {
        url += `?department=${selectedDepartment}`;
      }
      const response = await axios.get(url);
      setDoctors(response.data.msg || []);
    } catch (error) {
      console.error("Error fetching doctors:", error);
    }
  };

  const fetchDepartments = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:8000/add-department/");
      setDepartments(response.data.msg || []);
    } catch (error) {
      console.error("Error fetching departments:", error);
    }
  };

  const handleDepartmentChange = (e) => {
    setSelectedDepartment(e.target.value);
  };

  const handleInputChange = (e) => {
    setAppointmentData({ ...appointmentData, [e.target.name]: e.target.value });
  };

  const handleBookAppointment = (doctor) => {
    console.log("this is doctor",doctor);
    setSelectedDoctor(doctor);
    console.log("rhis is selected",selectedDoctor);
    setShowForm(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedDoctor) return;

    const appointmentDetails = {
      ...appointmentData,
      department: selectedDoctor.department,
      doctor:selectedDoctor.username
    };
    console.log("this is details",appointmentDetails);

    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/book-appointment/",
        appointmentDetails
      );
      alert("Appointment booked successfully!");
      setShowForm(false);
    } catch (error) {
      console.error("Error booking appointment:", error.response?.data || error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-semibold text-center mb-8">Our Doctors</h1>

      <div className="mb-6 flex space-x-4">
        <select
          value={selectedDepartment}
          onChange={handleDepartmentChange}
          className="p-2 border border-gray-300 rounded"
        >
          <option value="" disabled>Select Department</option>
          {departments.map((dept) => (
            <option key={dept.id} value={dept.id}>{dept.name}</option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {doctors.map((doctor) => (
          <div key={doctor.id} className="bg-white rounded-lg shadow-md p-4">
            <img
              src={`http://127.0.0.1:8000${doctor.profile}`}
              alt={`${doctor.username}'s profile`}
              className="w-full h-48 object-cover rounded-md mb-4"
            />
            <h2 className="text-xl font-semibold mb-2">ID: {doctor.id}</h2>
            <p className="text-gray-600 mb-2">Email: {doctor.email}</p>
            <p className="text-gray-600 mb-2">Staff ID: {doctor.staffid}</p>
            <p className="text-gray-600 mb-2">Department: {doctor.department}</p>
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              onClick={() => handleBookAppointment(doctor)}
            >
              Book Appointment
            </button>
          </div>
        ))}
      </div>
      {showForm && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold mb-4">Book Appointment</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input type="text" name="patient_name" placeholder="Patient Name" onChange={handleInputChange} required />
              <input type="text" name="contact_number" placeholder="Contact Number" onChange={handleInputChange} required />
              <input type="text" name="address" placeholder="Address" onChange={handleInputChange} required />
              <input type="date" name="appointment_date" onChange={handleInputChange} required />
              <textarea name="reason" placeholder="Reason for Appointment" onChange={handleInputChange} required />
              <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded">Confirm Appointment</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default OurDoctors;
