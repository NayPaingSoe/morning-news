import Link from 'next/link'
import React from 'react'

export default function Footer() {
  return (
    <footer className='bg-black h-40'>
      <div className='flex justify-center p-14 text-white '>
        <Link href="/" className='px-5'>Home</Link>
        <Link href='/search-page'>Search</Link>
      </div>
    </footer>
  )
}
