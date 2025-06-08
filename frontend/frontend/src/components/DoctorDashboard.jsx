import { useEffect, useState } from "react";
import axios from "axios";

const DoctorDashboard = () => {
  
  const doctorUsername = localStorage.getItem("doctorUsername");
  const [appointments, setAppointments] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editingAppointment, setEditingAppointment] = useState(null);

  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {
    try {
      const response = await axios.get(
        `http://127.0.0.1:8000/get-appointments/${doctorUsername}/`
      );
      setAppointments(response.data.appointments);
    } catch (error) {
      console.error("Error fetching appointments:", error.response?.data || error);
    }
  };

  const editAppointment = (appointment) => {
    setEditingAppointment(appointment);
    console.log(appointment);
    setIsEditing(true);
  };

  const handleDelete = async (id)=>{
    try{
      const response = await axios.delete(`http://127.0.0.1:8000/delete-appointments/${id}/`)
      console.log('this is response',response)
      fetchAppointments();
    }
    catch(e){
      console.log("error",e)
    }
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditingAppointment((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = async () => {
    console.log("this is",editingAppointment)
    try {
      await axios.put(
        `http://127.0.0.1:8000/update-appointment/${editingAppointment.id}/`,
        editingAppointment
      );
      setIsEditing(false);
      fetchAppointments();
    } catch (error) {
      console.error("Error updating appointment:", error.response?.data || error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-semibold text-center mb-6">My Appointments</h1>
      {appointments.length > 0 ? (
        <ul>
          {appointments.map((appointment, index) => (
            <li key={index} className="bg-white p-4 rounded shadow mb-3">
              <p><strong>Id:</strong> {appointment.id}</p>
              <p><strong>Patient:</strong> {appointment.patient_name}</p>
              <p><strong>Contact:</strong> {appointment.contact_number}</p>
              <p><strong>Address:</strong> {appointment.address}</p>
              <p><strong>Date:</strong> {appointment.appointment_date}</p>
              <p><strong>Department:</strong> {appointment.department}</p>
              <p><strong>Reason:</strong> {appointment.reason}</p>
              <button
                className="border p-2 cursor-pointer bg-red-400"
                onClick={() => editAppointment(appointment)}
              >
                Edit
              </button>
              <button className="border p-2 cursor-pointer ml-4 bg-red-300" onClick={()=>{handleDelete(appointment.id)}}>
                Delete
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-center text-gray-500">No appointments found.</p>
      )}

      {isEditing && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-xl font-semibold mb-4">Edit Appointment</h2>
            <form>
              <input
                type="text"
                name="patient_name"
                placeholder="Name"
                value={editingAppointment?.patient_name || ""}
                onChange={handleInputChange}
                className="w-full p-2 border rounded mb-2"
              />
              <input
                type="text"
                name="contact_number"
                placeholder="Contact"
                value={editingAppointment?.contact_number || ""}
                onChange={handleInputChange}
                className="w-full p-2 border rounded mb-2"
              />
              <input
                type="text"
                name="address"
                placeholder="Address"
                value={editingAppointment?.address || ""}
                onChange={handleInputChange}
                className="w-full p-2 border rounded mb-2"
              />
              <input
                type="date"
                name="date"
                placeholder="Address"
                value={editingAppointment?.date || ""}
                onChange={handleInputChange}
                className="w-full p-2 border rounded mb-2"
              />
              <input
                type="text"
                name="reason"
                placeholder="reason"
                value={editingAppointment?.reason || ""}
                onChange={handleInputChange}
                className="w-full p-2 border rounded mb-2"
              />
              <button
                type="button"
                className="bg-green-500 text-white px-4 py-2 rounded mr-2"
                onClick={handleSave}
              >
                Save
              </button>
              <button
                type="button"
                className="bg-gray-500 text-white px-4 py-2 rounded"
                onClick={() => setIsEditing(false)}
              >
                Cancel
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default DoctorDashboard;
