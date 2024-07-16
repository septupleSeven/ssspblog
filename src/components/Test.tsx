"use client"
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import React, { useState } from 'react'

const Test = () => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { push, replace } = useRouter();

  const [paramState, setParamState] = useState("")

  const handleSearch = (term:string) => {
    const params = new URLSearchParams(searchParams);

    if(term) {
      params.set('query', term);
      setParamState(params.toString())
    }else{
      params.delete('query');
    }

    // replace(`${pathname}?${params.toString()}`);
  }

  // console.log(searchParams)

  return (
  <div>
    <input 
      type='text'
      onChange={(e) => {
        handleSearch(e.target.value)
      }}
      // defaultValue={searchParams.get('query')?.toString()}
    />
    <button type='button' onClick={() => {
      push(`${pathname}search?${paramState.toString()}`)
    }}>검색</button>
  </div>

  )
}

export default Test