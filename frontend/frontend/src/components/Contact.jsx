

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import {
  FaMapMarkerAlt,
  FaPhone,
  FaEnvelope,
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
  FaPaperPlane,
} from "react-icons/fa"
import Header from "./Header"
import Footer from "./Footer"

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })
  const [formErrors, setFormErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  const handleChange = (e) => {
    const { id, value } = e.target
    setFormData({ ...formData, [id]: value })

    // Clear error when user starts typing
    if (formErrors[id]) {
      setFormErrors({ ...formErrors, [id]: "" })
    }
  }

  const validateForm = () => {
    const errors = {}
    if (!formData.name.trim()) errors.name = "Name is required"
    if (!formData.email.trim()) {
      errors.email = "Email is required"
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = "Email is invalid"
    }
    if (!formData.message.trim()) errors.message = "Message is required"

    setFormErrors(errors)
    return Object.keys(errors).length === 0
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if (validateForm()) {
      setIsSubmitting(true)

      // Simulate form submission
      setTimeout(() => {
        setIsSubmitting(false)
        setIsSubmitted(true)
        setFormData({ name: "", email: "", subject: "", message: "" })

        // Reset success message after 5 seconds
        setTimeout(() => {
          setIsSubmitted(false)
        }, 5000)
      }, 1500)
    }
  }

  // Animation variants
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
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      <Header />

      <div className="container mx-auto px-4 py-16">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isVisible ? "visible" : "hidden"}
          className="max-w-6xl mx-auto"
        >
          {/* Hero Section */}
          <motion.div variants={itemVariants} className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Get in <span className="text-blue-600">Touch</span>
            </h1>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              We're here to help with any questions about our services, appointments, or general inquiries. Our team is
              ready to assist you.
            </p>
          </motion.div>

          {/* Main Content */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Contact Information Card */}
            <motion.div
              variants={itemVariants}
              className="bg-white rounded-2xl shadow-xl overflow-hidden lg:col-span-1"
            >
              <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-8">
                <h2 className="text-2xl font-bold mb-6">Contact Information</h2>
                <p className="mb-8 opacity-90">
                  Have questions? Reach out to us through any of these channels and we'll respond as soon as possible.
                </p>

                <div className="space-y-6">
                  <div className="flex items-start">
                    <div className="bg-blue-500 p-3 rounded-full mr-4">
                      <FaMapMarkerAlt className="text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg">Our Location</h3>
                      <p className="opacity-90">Urlabari, Mangalbare</p>
                      <p className="opacity-90">Morang, Nepal</p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="bg-blue-500 p-3 rounded-full mr-4">
                      <FaPhone className="text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg">Phone Number</h3>
                      <p className="opacity-90">+97798******</p>
                      <p className="opacity-90">+97798******</p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="bg-blue-500 p-3 rounded-full mr-4">
                      <FaEnvelope className="text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg">Email Address</h3>
                      <p className="opacity-90">hospitalmanagement@healthcare.com</p>
                      <p className="opacity-90">support@healthcare.com</p>
                    </div>
                  </div>
                </div>

                {/* Social Media Links */}
                <div className="mt-12">
                  <h3 className="font-semibold mb-4">Follow Us</h3>
                  <div className="flex space-x-4">
                    <a href="#" className="bg-blue-500 hover:bg-blue-400 p-3 rounded-full transition-colors">
                      <FaFacebookF className="text-white" />
                    </a>
                    <a href="#" className="bg-blue-500 hover:bg-blue-400 p-3 rounded-full transition-colors">
                      <FaTwitter className="text-white" />
                    </a>
                    <a href="#" className="bg-blue-500 hover:bg-blue-400 p-3 rounded-full transition-colors">
                      <FaInstagram className="text-white" />
                    </a>
                    <a href="#" className="bg-blue-500 hover:bg-blue-400 p-3 rounded-full transition-colors">
                      <FaLinkedinIn className="text-white" />
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Contact Form */}
            <motion.div variants={itemVariants} className="bg-white rounded-2xl shadow-xl p-8 lg:col-span-2">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Send Us a Message</h2>

              {isSubmitted ? (
                <div className="bg-green-50 border border-green-200 text-green-700 rounded-lg p-6 text-center">
                  <div className="flex justify-center mb-4">
                    <div className="bg-green-100 p-3 rounded-full">
                      <FaPaperPlane className="text-green-500 text-xl" />
                    </div>
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Message Sent Successfully!</h3>
                  <p>Thank you for reaching out. We'll get back to you as soon as possible.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="name" className="block text-gray-700 font-medium mb-2">
                        Full Name
                      </label>
                      <input
                        type="text"
                        id="name"
                        value={formData.name}
                        onChange={handleChange}
                        className={`w-full px-4 py-3 rounded-lg border ${
                          formErrors.name ? "border-red-500" : "border-gray-300"
                        } focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all`}
                        placeholder="John Doe"
                      />
                      {formErrors.name && <p className="text-red-500 text-sm mt-1">{formErrors.name}</p>}
                    </div>

                    <div>
                      <label htmlFor="email" className="block text-gray-700 font-medium mb-2">
                        Email Address
                      </label>
                      <input
                        type="email"
                        id="email"
                        value={formData.email}
                        onChange={handleChange}
                        className={`w-full px-4 py-3 rounded-lg border ${
                          formErrors.email ? "border-red-500" : "border-gray-300"
                        } focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all`}
                        placeholder="john@example.com"
                      />
                      {formErrors.email && <p className="text-red-500 text-sm mt-1">{formErrors.email}</p>}
                    </div>
                  </div>

                  <div>
                    <label htmlFor="subject" className="block text-gray-700 font-medium mb-2">
                      Subject (Optional)
                    </label>
                    <input
                      type="text"
                      id="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                      placeholder="How can we help you?"
                    />
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-gray-700 font-medium mb-2">
                      Your Message
                    </label>
                    <textarea
                      id="message"
                      rows="5"
                      value={formData.message}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 rounded-lg border ${
                        formErrors.message ? "border-red-500" : "border-gray-300"
                      } focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all resize-none`}
                      placeholder="Write your message here..."
                    ></textarea>
                    {formErrors.message && <p className="text-red-500 text-sm mt-1">{formErrors.message}</p>}
                  </div>

                  <div>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className={`w-full md:w-auto px-8 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold rounded-lg shadow-md hover:from-blue-700 hover:to-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-all transform hover:scale-105 ${
                        isSubmitting ? "opacity-70 cursor-not-allowed" : ""
                      }`}
                    >
                      {isSubmitting ? (
                        <span className="flex items-center justify-center">
                          <svg
                            className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                          >
                            <circle
                              className="opacity-25"
                              cx="12"
                              cy="12"
                              r="10"
                              stroke="currentColor"
                              strokeWidth="4"
                            ></circle>
                            <path
                              className="opacity-75"
                              fill="currentColor"
                              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                            ></path>
                          </svg>
                          Sending...
                        </span>
                      ) : (
                        <span className="flex items-center">
                          <FaPaperPlane className="mr-2" />
                          Send Message
                        </span>
                      )}
                    </button>
                  </div>
                </form>
              )}
            </motion.div>
          </div>

          {/* Map Section */}
          <motion.div variants={itemVariants} className="mt-16">
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
              <div className="p-6 border-b">
                <h2 className="text-2xl font-bold text-gray-800">Our Location</h2>
                <p className="text-gray-600">Visit us at our healthcare facility</p>
              </div>
              <div className="h-96 w-full bg-gray-200">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3571.3307257544396!2d87.60833!3d26.6603!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39e58ebe95555555%3A0x55555555555!2sUrlabari%2C%20Nepal!5e0!3m2!1sen!2sus!4v1623456789012!5m2!1sen!2sus"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  title="Hospital Location"
                ></iframe>
              </div>
            </div>
          </motion.div>

          {/* FAQ Section */}
          <motion.div variants={itemVariants} className="mt-16">
            <div className="text-center mb-10">
              <h2 className="text-3xl font-bold text-gray-800">Frequently Asked Questions</h2>
              <p className="text-gray-600 mt-2">Find quick answers to common questions</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">What are your operating hours?</h3>
                <p className="text-gray-600">
                  Our hospital is open 24/7 for emergencies. Regular consultation hours are from 9:00 AM to 5:00 PM,
                  Monday through Saturday.
                </p>
              </div>

              <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">How do I schedule an appointment?</h3>
                <p className="text-gray-600">
                  You can schedule appointments through our website, mobile app, or by calling our appointment desk at
                  +97798******.
                </p>
              </div>

              <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">Do you accept insurance?</h3>
                <p className="text-gray-600">
                  Yes, we accept most major insurance providers. Please contact our billing department for specific
                  information about your insurance plan.
                </p>
              </div>

              <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">What should I bring to my appointment?</h3>
                <p className="text-gray-600">
                  Please bring your ID, insurance card, list of current medications, and any relevant medical records or
                  test results.
                </p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>

      <Footer />
    </div>
  )
}

export default Contact
