import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'



const Nav = () => {
   const location = useLocation()
   const path = location.pathname == '/'
   const navigate = useNavigate()

 const changePath = ()=>{
if( location.pathname=='/'){
    navigate('/reader')
}
else{
    navigate('/')
}

 }
   
  return (
    <nav className='w-full border-b-2 flex p-1 px-3 items-center justify-between '>
       <div className='flex items-center gap-1'>
         <img className='w-12' src="./logo.webp" alt=""/>
        <p className='font-bold text-2xl text-transparent bg-[linear-gradient(-360deg,blue,gray_70%)] bg-clip-text  '>Bulk Mailer</p>
       </div>
       <div className='md:hidden'>
        <p onClick={changePath} className='border px-4 py-1 rounded-2xl cursor-pointer '>
            {path?'History':'BulkMail'}
        </p>

       </div>
    </nav>
  )
}

export default Nav