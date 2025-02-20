import React from 'react'

const Navbar = () => {
  return (
    <nav className='flex justify-around items-center bg-indigo-900 text-white h-11 w-full'>
      <div className='font-bold'><button>iTask</button></div>
      <div>
        <ul className='flex gap-4'>
            <li><button>Home</button></li>
            <li><button>About</button></li>
        </ul>
      </div>
    </nav>
  )
}

export default Navbar
