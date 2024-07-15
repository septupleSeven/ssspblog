"use client"
import React from 'react'

interface EmptyProps {
  title?: string;
}

const Empty = ({
  title = "게시물이 없습니다"
}) => {
  return (
    <div>
      {/* <Image /> */}
      <p>{title}</p>
    </div>
  )
}

export default Empty