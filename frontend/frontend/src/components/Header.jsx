
import { useState, useEffect } from "react"
import logo from "../assets/LOGO.png"
import { Link } from "react-router-dom"
import { GiHamburgerMenu } from "react-icons/gi"
import { IoMdClose } from "react-icons/io"
import { motion, AnimatePresence } from "framer-motion"
import ChatPage from "./ChatPage"
// import { useChat } from "./ChatContext"


const Header = () => {
  // let {open, setOpen} = useChat();
  const [open,setOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  

  useEffect(() => {
    console.log("chat opened ",open);
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true)
      } else {
        setScrolled(false)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(()=>{
    console.log("this is",open)
  },[open])

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }
  const handleChat = (e)=>{
    setOpen(true);
  }

  // Navigation links data for DRY code
  const navLinks = [
    { to: "/home", label: "Home" },
    { to: "/all-doctor", label: "All Doctors" },
    { to: "/about", label: "About" },
    { to: "/contact", label: "Contact" },
    { to: "/blog", label: "Blog" },
  ]

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        scrolled ? "bg-white shadow-md py-2" : "bg-white py-4"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="h-16 w-16 md:h-20 md:w-20 flex-shrink-0">
            <Link to="/home">
              <img
                src={logo || "/placeholder.svg"}
                alt="Logo"
                className="h-full w-full object-contain transition-transform hover:scale-105"
              />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:block">
            <ul className="flex space-x-8">
              {navLinks.map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="relative font-medium text-gray-700 transition-colors hover:text-blue-600 after:absolute after:bottom-[-4px] after:left-0 after:h-[2px] after:w-0 after:bg-blue-600 after:transition-all hover:after:w-full"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Action Button */}
          <div className="hidden md:block">
            <div>
              <button className="rounded-lg bg-blue-600 px-6 py-2 font-medium text-white transition-all duration-300 hover:bg-blue-700 hover:shadow-lg" onClick={(e)=>handleChat(e)}>
                Chat with Us
              </button>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="flex h-10 w-10 items-center justify-center rounded-md text-gray-700 md:hidden"
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? (
              <IoMdClose className="h-6 w-6 transition-transform hover:rotate-90" />
            ) : (
              <GiHamburgerMenu className="h-6 w-6 transition-transform hover:scale-110" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-x-0 top-[72px] z-50 bg-white shadow-lg md:hidden"
          >
            <nav className="container mx-auto p-4">
              <ul className="flex flex-col space-y-4">
                {navLinks.map((link) => (
                  <li key={link.to}>
                    <Link
                      to={link.to}
                      className="block rounded-md p-2 font-medium text-gray-800 transition-colors hover:bg-blue-50 hover:text-blue-600"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
                <li className="pt-2">
                  <div
                    className="block rounded-md bg-blue-600 p-3 text-center font-medium text-white transition-all hover:bg-blue-700"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Chat With Us
                  </div>
                </li>
              </ul>
            </nav>
          </motion.div>
        )}
        {open? <ChatPage></ChatPage>:<></>}
      </AnimatePresence>
    </header>
  )
}

export default Header
