import { FaHospitalUser, FaClock, FaShieldAlt, FaLaptopMedical } from "react-icons/fa";

const WhyUs = () => {
  const features = [
    {
      icon: <FaClock className="text-4xl text-blue-500" />,
      title: "Efficient & Fast",
      description: "Our system reduces waiting time and speeds up hospital processes, ensuring quick and hassle-free appointments."
    },
    {
      icon: <FaHospitalUser className="text-4xl text-green-500" />,
      title: "User-Friendly",
      description: "A simple and intuitive interface makes it easy for patients and doctors to manage appointments and records."
    },
    {
      icon: <FaShieldAlt className="text-4xl text-red-500" />,
      title: "Secure & Reliable",
      description: "We prioritize data security with robust encryption, ensuring patient information is always protected."
    },
    {
      icon: <FaLaptopMedical className="text-4xl text-yellow-500" />,
      title: "24/7 Access",
      description: "Book appointments and access medical records anytime, anywhere with our cloud-based system."
    }
  ];

  return (
    <section className="py-12 bg-gray-100">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-4xl font-bold text-gray-800 mb-6">Why Choose Us?</h2>
        <p className="text-lg text-gray-600 mb-10">
          We provide an advanced Hospital Management System to make healthcare services seamless, efficient, and secure.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <div key={index} className="bg-white p-6 rounded-2xl shadow-md text-center">
              <div className="mb-4 flex justify-center">{feature.icon}</div>
              <h3 className="text-xl font-semibold text-gray-700">{feature.title}</h3>
              <p className="text-gray-600 mt-2">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyUs;
