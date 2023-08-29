import {Outlet, Navigate} from 'react-router-dom'


import React from 'react'
import { useAuth } from './context/AuthContext'
import { useEffect } from 'react'



export const PrivateRoute = ({children}) => {
    const {user} = useAuth()
    useEffect(() => {
        console.log(user)
    }, [])

    if(!user) {
        return <Navigate to="/" />
    }



   return children ? children : <Outlet />
  
}
