import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'

const ProtecterRoutes = ({allowed}) => {
    console.log("this is allowed",allowed)
    const isauthenticated = localStorage.getItem('admin_token')

    let what = localStorage.getItem('user')
    console.log(what,isauthenticated)

    if(!isauthenticated){
        return(
            <Navigate to="/signin"></Navigate>
        )
    }
    if(allowed && !allowed.includes(what)){
        return(
             <Navigate to="/unauthorized" replace />
        )
    }

  return (
<Outlet></Outlet>
  )
}

export default ProtecterRoutes