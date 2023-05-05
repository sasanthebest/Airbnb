'use client'



import React, { useEffect } from 'react'
import EmptyState from './components/EmptyState'


interface ErrorEstateProps{
    error:Error
}

const ErrorEstate = ({error}:ErrorEstateProps) => {
  useEffect(() => {
    console.error(error)
  }, [error])
    
  return (
    <EmptyState title='...اووووه' subtitle='یه مشکلی هست یه بار دیگه تلاش کنید'/>
  )
}

export default ErrorEstate