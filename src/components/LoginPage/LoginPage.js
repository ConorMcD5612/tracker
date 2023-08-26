import React from 'react'
import { Auth } from '../Auth'

export const LoginPage = ({setIsLoading}) => {
  return (
    <>
    <Auth setIsLoading={setIsLoading}/>
    </>
  )
}
