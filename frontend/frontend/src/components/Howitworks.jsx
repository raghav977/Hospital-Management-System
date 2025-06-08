import { FaUserPlus, FaCalendarCheck, FaClipboardCheck, FaEnvelopeOpenText } from "react-icons/fa";

const Howitworks = () => {
  const steps = [
    {
      icon: <FaUserPlus className="text-4xl text-blue-500" />,
      title: "Register/Login",
      description: "Create an account or log in to access the hospital services."
    },
    {
      icon: <FaCalendarCheck className="text-4xl text-green-500" />,
      title: "Book an Appointment",
      description: "Choose a doctor, select a time slot, and confirm your appointment."
    },
    {
      icon: <FaClipboardCheck className="text-4xl text-purple-500" />,
      title: "Visit the Doctor",
      description: "Meet your doctor at the scheduled time for consultation."
    },
    {
      icon: <FaEnvelopeOpenText className="text-4xl text-red-500" />,
      title: "Get Reports & Follow-Up",
      description: "Receive prescriptions, test reports, and schedule follow-ups if needed."
    }
  ];

  return (
    <section className="py-12 bg-gray-100">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-4xl font-bold text-gray-800 mb-6">How It Works</h2>
        <p className="text-lg text-gray-600 mb-10">
          Simple and seamless steps to manage your healthcare experience.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, index) => (
            <div key={index} className="bg-white p-6 rounded-2xl shadow-md text-center hover:bg-blue-50 transition">
              <div className="mb-4 flex justify-center">{step.icon}</div>
              <h3 className="text-xl font-semibold text-gray-700">{step.title}</h3>
              <p className="text-gray-600 mt-2">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Howitworks;
