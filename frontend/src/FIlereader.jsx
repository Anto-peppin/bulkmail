import React from 'react'
import { useEffect } from 'react'
import axios from 'axios'
import { useState } from 'react'

const FIlereader = () => {
  const [history,setHistory] = useState([])

  useEffect(()=>{
    const dbapi = async()=>{
    const historyData = await axios.get(`${import.meta.env.VITE_HISTORY}`)
    setHistory(historyData.data);

    }
    dbapi()
  },[])

  return (
    <div className='pt-3 pl-3 flex flex-col gap-2 '>
      {
        history.map((data,ind)=>(
          <div className='border p-2 rounded shadow-md mb-4 flex flex-col gap-2 md:flex-row md:gap-6' key={ind}>
           
           <div className='flex flex-col gap-2 md:border-r-2 md:pr-6'>
            <div className='flex gap-1 '>
              <label className='font-bold '>From :</label>
              <p>{data.from}</p>
            </div>

            <div>
              <label className='font-bold'>To :</label>
             <div className=' ml-5 flex flex-col gap-0.5 max-h-[100px] overflow-auto'>
               {
                data.to.map((val,inde)=>(
                  <p key={inde}>{inde+1}- {val}</p>
                ))
              }
             </div>
            </div>

            <div className='flex gap-1'>
              <label className='font-bold'>Date :</label>
              <p>{data.date}</p>
            </div>

            <div className='flex gap-1'>
              <label className='font-bold' >Time :</label>
              <p>{data.time}</p>
            </div>

           </div>
           <div className='flex flex-col gap-2 '>
            <div className=''>
              <label className='font-bold'>Subject :</label>
              <p className='ml-5'>{`${data.subject?data.subject:'--no Subject Added--'}`}</p>
            </div>

             <div className='flex gap-1 flex-col'>
              <label className='font-bold '>text :</label>
              <p className='ml-5'>{`${data.text?data.text:'--no text Added--'}`}</p>
            </div>
           </div>
          </div>
        ))
      }
    </div>
  )
}

export default FIlereader