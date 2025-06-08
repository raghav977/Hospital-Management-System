
import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import group from "../assets/groupwala.jpg"
import main from "../assets/whataboutthis.png"

const Herosection = () => {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        staggerChildren: 0.2,
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

  const imageVariants = {
    hidden: { opacity: 0, x: 50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
  }

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 text-white">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute -top-4 -right-4 h-72 w-72 rounded-full bg-white/20"></div>
        <div className="absolute -bottom-8 -left-8 h-96 w-96 rounded-full bg-white/10"></div>
      </div>

      <div className="relative container mx-auto px-4 py-16 md:py-24">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isVisible ? "visible" : "hidden"}
          className="flex flex-col items-center gap-12 md:flex-row md:items-center md:justify-between"
        >
          {/* Left Content */}
          <div className="flex-1 space-y-8 text-center md:text-left">
            <motion.div variants={itemVariants} className="space-y-4">
              <h1 className="text-4xl font-bold leading-tight md:text-5xl lg:text-6xl">
                Book Appointment
                <br />
                <span className="text-blue-200">With Trusted Doctors</span>
              </h1>
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="flex flex-col items-center gap-4 md:flex-row md:items-center"
            >
              <div className="relative">
                <img
                  src={group || "/placeholder.svg"}
                  alt="Trusted doctors group"
                  className="h-20 w-20 rounded-full border-4 border-white/30 object-cover shadow-lg transition-transform hover:scale-105"
                />
                <div className="absolute -bottom-1 -right-1 h-6 w-6 rounded-full bg-green-400 border-2 border-white"></div>
              </div>
              <div className="space-y-1">
                <p className="text-lg font-medium text-blue-100">Simply browse our trusted doctors list</p>
                <p className="text-blue-200">Schedule your appointment hassle-free</p>
              </div>
            </motion.div>

            <motion.div variants={itemVariants}>
              <button className="group relative overflow-hidden rounded-full bg-white px-8 py-4 font-semibold text-blue-700 shadow-lg transition-all duration-300 hover:bg-blue-50 hover:shadow-xl hover:scale-105">
                <span className="relative z-10">Book Appointment</span>
                <div className="absolute inset-0 -z-10 bg-gradient-to-r from-blue-100 to-blue-50 opacity-0 transition-opacity group-hover:opacity-100"></div>
              </button>
            </motion.div>
          </div>

          {/* Right Content - Hero Image */}
          <motion.div variants={imageVariants} className="flex-1 flex justify-center md:justify-end">
            <div className="relative">
              <div className="absolute -inset-4 rounded-2xl bg-gradient-to-r from-blue-400/20 to-purple-400/20 blur-xl"></div>
              <img
                src={main || "/placeholder.svg"}
                alt="Healthcare professional"
                className="relative h-80 w-auto object-contain md:h-96 lg:h-[420px] transition-transform hover:scale-105"
              />
              {/* Floating elements */}
              <div className="absolute top-4 right-4 h-3 w-3 rounded-full bg-yellow-400 animate-pulse"></div>
              <div className="absolute bottom-8 left-4 h-2 w-2 rounded-full bg-green-400 animate-pulse delay-300"></div>
              <div className="absolute top-1/2 -left-2 h-4 w-4 rounded-full bg-pink-400 animate-pulse delay-700"></div>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Bottom Wave */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden">
        <svg
          className="relative block h-12 w-full"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
        >
          <path
            d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"
            fill="white"
          ></path>
        </svg>
      </div>
    </section>
  )
}

export default Herosection
