

import { useEffect, useState, useRef } from "react"
import { motion } from "framer-motion"
import { FaStethoscope, FaAmbulance, FaPills, FaHeartbeat, FaXRay, FaUserMd } from "react-icons/fa"

const Services = () => {
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 },
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  const services = [
    {
      icon: <FaStethoscope className="text-4xl" />,
      title: "General Checkup",
      description: "Comprehensive health checkups by experienced doctors.",
      color: "from-blue-500 to-blue-600",
      bgColor: "bg-blue-50",
      hoverColor: "hover:bg-blue-100",
    },
    {
      icon: <FaAmbulance className="text-4xl" />,
      title: "Emergency Care",
      description: "24/7 emergency services with quick response times.",
      color: "from-red-500 to-red-600",
      bgColor: "bg-red-50",
      hoverColor: "hover:bg-red-100",
    },
    {
      icon: <FaPills className="text-4xl" />,
      title: "Pharmacy Services",
      description: "Get your medicines easily from our in-house pharmacy.",
      color: "from-green-500 to-green-600",
      bgColor: "bg-green-50",
      hoverColor: "hover:bg-green-100",
    },
    {
      icon: <FaHeartbeat className="text-4xl" />,
      title: "Cardiology",
      description: "Expert cardiologists for heart-related health concerns.",
      color: "from-pink-500 to-pink-600",
      bgColor: "bg-pink-50",
      hoverColor: "hover:bg-pink-100",
    },
    {
      icon: <FaXRay className="text-4xl" />,
      title: "Radiology & Imaging",
      description: "Advanced X-ray, MRI, and CT scan services.",
      color: "from-purple-500 to-purple-600",
      bgColor: "bg-purple-50",
      hoverColor: "hover:bg-purple-100",
    },
    {
      icon: <FaUserMd className="text-4xl" />,
      title: "Specialist Doctors",
      description: "Consult highly qualified specialists for various treatments.",
      color: "from-yellow-500 to-yellow-600",
      bgColor: "bg-yellow-50",
      hoverColor: "hover:bg-yellow-100",
    },
  ]

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

  const itemVariants = {
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

  const headerVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  }

  return (
    <section ref={sectionRef} className="py-16 bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4">
        <motion.div
          variants={headerVariants}
          initial="hidden"
          animate={isVisible ? "visible" : "hidden"}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            Our <span className="text-blue-600">Services</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
            We provide high-quality medical services to ensure the best patient care experience with modern facilities
            and expert professionals.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isVisible ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {services.map((service, index) => (
            <motion.div key={index} variants={itemVariants} className="group relative">
              <div
                className={`relative bg-white p-8 rounded-2xl shadow-lg transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 ${service.hoverColor} border border-gray-100`}
              >
                {/* Background gradient on hover */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${service.color} opacity-0 group-hover:opacity-5 rounded-2xl transition-opacity duration-300`}
                ></div>

                {/* Icon container */}
                <div
                  className={`relative mb-6 w-16 h-16 mx-auto rounded-full bg-gradient-to-br ${service.color} flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform duration-300`}
                >
                  {service.icon}
                </div>

                {/* Content */}
                <div className="relative text-center">
                  <h3 className="text-xl font-bold text-gray-800 mb-3 group-hover:text-gray-900 transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed group-hover:text-gray-700 transition-colors">
                    {service.description}
                  </p>
                </div>

                {/* Decorative elements */}
                <div className="absolute top-4 right-4 w-2 h-2 bg-gray-200 rounded-full group-hover:bg-blue-300 transition-colors"></div>
                <div className="absolute bottom-4 left-4 w-1 h-1 bg-gray-200 rounded-full group-hover:bg-blue-300 transition-colors"></div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Call to action */}
        <motion.div
          variants={itemVariants}
          initial="hidden"
          animate={isVisible ? "visible" : "hidden"}
          className="text-center mt-16"
        >
          <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
            View All Services
          </button>
        </motion.div>
      </div>
    </section>
  )
}

export default Services
