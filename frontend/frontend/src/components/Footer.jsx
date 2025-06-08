import React from 'react'

const Footer = () => {
  return (
    <div>
        <footer className="w-full bg-blue-600 text-white py-4 mt-8 text-center">
        <p className="text-lg">&copy; {new Date().getFullYear()} Hospital Management System. All rights reserved.</p>
      </footer>
    </div>
  )
}

export default Footer