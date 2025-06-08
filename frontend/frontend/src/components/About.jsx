

import { useState, useEffect, useRef } from "react"
import { motion } from "framer-motion"
import { Link } from "react-router-dom"
import {
  FaHospital,
  FaUserMd,
  FaCalendarCheck,
  FaShieldAlt,
  FaChartLine,
  FaUsers,
  FaAward,
  FaHeart,
} from "react-icons/fa"
import Header from "./Header"
import Footer from "./Footer"

const About = () => {
  const [isVisible, setIsVisible] = useState({})
  const sectionRefs = useRef({})

  useEffect(() => {
    const observers = {}

    Object.keys(sectionRefs.current).forEach((key) => {
      if (sectionRefs.current[key]) {
        observers[key] = new IntersectionObserver(
          ([entry]) => {
            setIsVisible((prev) => ({
              ...prev,
              [key]: entry.isIntersecting,
            }))
          },
          { threshold: 0.1 },
        )
        observers[key].observe(sectionRefs.current[key])
      }
    })

    return () => {
      Object.values(observers).forEach((observer) => observer.disconnect())
    }
  }, [])

  const features = [
    {
      icon: <FaHospital className="text-4xl" />,
      title: "Efficient Operations",
      description: "Seamless management of patients, staff, and records with automated workflows.",
      color: "from-blue-500 to-blue-600",
      bgColor: "bg-blue-50",
    },
    {
      icon: <FaUserMd className="text-4xl" />,
      title: "Doctor & Patient Portals",
      description: "Dedicated dashboards providing easy access for healthcare professionals and patients.",
      color: "from-green-500 to-green-600",
      bgColor: "bg-green-50",
    },
    {
      icon: <FaCalendarCheck className="text-4xl" />,
      title: "Appointment Management",
      description: "Smart scheduling system that optimizes time slots and reduces waiting periods.",
      color: "from-red-500 to-red-600",
      bgColor: "bg-red-50",
    },
  ]

  const stats = [
    { icon: <FaUsers />, number: "10,000+", label: "Patients Served" },
    { icon: <FaUserMd />, number: "500+", label: "Healthcare Professionals" },
    { icon: <FaCalendarCheck />, number: "50,000+", label: "Appointments Scheduled" },
    { icon: <FaAward />, number: "99.9%", label: "System Uptime" },
  ]

  const objectives = [
    {
      icon: <FaChartLine />,
      title: "Enhance Efficiency",
      description: "Streamline hospital operations through digital transformation",
    },
    {
      icon: <FaShieldAlt />,
      title: "Secure Records",
      description: "Ensure secure and accessible patient records with advanced encryption",
    },
    {
      icon: <FaHeart />,
      title: "Improve Communication",
      description: "Foster better communication between doctors and patients",
    },
    {
      icon: <FaUsers />,
      title: "Reduce Workload",
      description: "Minimize administrative burden for hospital staff",
    },
  ]

  // Animation variants
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

  const heroVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
  }

  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-gray-50 to-white">
      <Header />

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-20 left-20 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse"></div>
          <div className="absolute top-40 right-20 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse delay-700"></div>
          <div className="absolute -bottom-8 left-40 w-72 h-72 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse delay-1000"></div>
        </div>

        <div className="relative container mx-auto px-4 text-center">
          <motion.div
            ref={(el) => (sectionRefs.current.hero = el)}
            variants={heroVariants}
            initial="hidden"
            animate={isVisible.hero ? "visible" : "hidden"}
            className="max-w-4xl mx-auto"
          >
            <h1 className="text-5xl md:text-7xl font-bold mb-6">
              About Our{" "}
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Hospital Management System
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 mb-8 leading-relaxed">
              Revolutionizing healthcare through innovative technology, streamlining operations for efficient patient
              care, and empowering medical professionals with cutting-edge tools.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              
              <Link className="border-2 border-blue-600 text-blue-600 px-8 py-4 rounded-full font-semibold hover:bg-blue-600 hover:text-white cursor-pointer transition-all" to="/contact" >
              Contact Us
                
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            ref={(el) => (sectionRefs.current.features = el)}
            variants={containerVariants}
            initial="hidden"
            animate={isVisible.features ? "visible" : "hidden"}
          >
            <motion.div variants={itemVariants} className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
                Key <span className="text-blue-600">Features</span>
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Our comprehensive hospital management system offers powerful features designed to enhance healthcare
                delivery and operational efficiency.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  className="group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden"
                >
                  <div className="p-8 text-center">
                    <div
                      className={`w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-r ${feature.color} flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform duration-300`}
                    >
                      {feature.icon}
                    </div>
                    <h3 className="text-2xl font-bold text-gray-800 mb-4">{feature.title}</h3>
                    <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                  </div>
                  <div
                    className={`absolute inset-0 bg-gradient-to-r ${feature.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}
                  ></div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-700 text-white">
        <div className="container mx-auto px-4">
          <motion.div
            ref={(el) => (sectionRefs.current.stats = el)}
            variants={containerVariants}
            initial="hidden"
            animate={isVisible.stats ? "visible" : "hidden"}
            className="grid grid-cols-2 md:grid-cols-4 gap-8"
          >
            {stats.map((stat, index) => (
              <motion.div key={index} variants={itemVariants} className="text-center">
                <div className="text-4xl mb-4 flex justify-center">{stat.icon}</div>
                <div className="text-3xl md:text-4xl font-bold mb-2">{stat.number}</div>
                <div className="text-blue-100">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Goals & Vision Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.div
            ref={(el) => (sectionRefs.current.vision = el)}
            variants={containerVariants}
            initial="hidden"
            animate={isVisible.vision ? "visible" : "hidden"}
            className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center"
          >
            <motion.div variants={itemVariants}>
              <h2 className="text-4xl font-bold text-gray-800 mb-6">Our Goals</h2>
              <p className="text-lg text-gray-600 leading-relaxed mb-8">
                We strive to provide a comprehensive digital solution that enhances hospital efficiency, significantly
                reduces patient wait times, and ensures accurate, secure record-keeping for better healthcare outcomes.
              </p>
              <div className="bg-white p-6 rounded-xl shadow-md">
                <h3 className="text-xl font-semibold text-blue-600 mb-3">Patient-Centered Care</h3>
                <p className="text-gray-600">
                  Our primary focus is improving patient experiences through streamlined processes and better
                  communication channels.
                </p>
              </div>
            </motion.div>

            <motion.div variants={itemVariants}>
              <h2 className="text-4xl font-bold text-gray-800 mb-6">Our Vision</h2>
              <p className="text-lg text-gray-600 leading-relaxed mb-8">
                To revolutionize healthcare management by seamlessly integrating cutting-edge technology, dramatically
                improving patient experiences, and providing unwavering support to medical professionals worldwide.
              </p>
              <div className="bg-white p-6 rounded-xl shadow-md">
                <h3 className="text-xl font-semibold text-purple-600 mb-3">Future of Healthcare</h3>
                <p className="text-gray-600">
                  We envision a world where technology empowers healthcare providers to deliver exceptional care with
                  maximum efficiency.
                </p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Objectives Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            ref={(el) => (sectionRefs.current.objectives = el)}
            variants={containerVariants}
            initial="hidden"
            animate={isVisible.objectives ? "visible" : "hidden"}
          >
            <motion.div variants={itemVariants} className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
                Our <span className="text-blue-600">Objectives</span>
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Strategic goals that drive our mission to transform healthcare management and delivery.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {objectives.map((objective, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  className="flex items-start p-6 bg-gray-50 rounded-xl hover:bg-white hover:shadow-lg transition-all duration-300"
                >
                  <div className="bg-blue-100 p-3 rounded-full mr-4 flex-shrink-0">
                    <div className="text-blue-600 text-xl">{objective.icon}</div>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-800 mb-2">{objective.title}</h3>
                    <p className="text-gray-600">{objective.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  )
}

export default About
