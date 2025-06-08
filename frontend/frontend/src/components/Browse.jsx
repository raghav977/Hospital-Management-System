import React from 'react'
import { Link } from 'react-router-dom'
const Browse = () => {
  return (
    <div>
        <p className='flex items-center justify-center'>
            <Link to="/all-doctor" className='border p-2 bg-blend-color-burn hover:bg-yellow-400 hover:transition-all hover:delay-75 rounded-xl'>Browse More</Link>
        </p>
    </div>
  )
}

export default Browse