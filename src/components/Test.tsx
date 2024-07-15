"use client"
import { useSearchParams } from 'next/navigation'
import React from 'react'

const Test = () => {

  const aaa = useSearchParams();
  console.log(aaa.get("id"))

  return (
    <div>Test</div>
  )
}

export default Test