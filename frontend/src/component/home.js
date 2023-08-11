import React from 'react'
import { Link } from 'react-router-dom'

function Home() {
  return (
    <div>
        <h1>Welcome To the Home Page </h1>
        <h2>Login to Continue</h2>
       <Link to='/register' className='btn' ><button >Login</button></Link>
    </div>
  )
}

export default Home