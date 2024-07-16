"use client"
import React, { useEffect } from 'react'

const Test2 = () => {

    useEffect(() => {
        console.log("history ====>", history)
    }, [])
  
    return (
        <div>Test222</div>
  )
}

export default Test2