"use client"
import { ArrowUpIcon } from '@heroicons/react/24/solid'
import React from 'react'

const PostDetailScrollToTop = () => {

  const scrollToTop = () => {
    if(typeof window !== "undefined"){
      window.scrollTo({
        top: 0,
        behavior: "smooth"
      })
    }
  }

  return (
    <button onClick={scrollToTop} className="flex h-[50px] w-[50px] items-center justify-center rounded-full bg-primary text-white shadow-reg semi-mobile:h-[40px] semi-mobile:w-[40px] semi-mobile:p-[10px]">
      <ArrowUpIcon className="size-6" />
    </button>
  )
}

export default PostDetailScrollToTop