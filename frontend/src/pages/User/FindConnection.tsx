import React from 'react'
import Leftbar from '../../components/user/Leftbar';
import AllConnection from '../../components/user/AllConnection';


const FindConnection = () => {
  return (
    <div className='flex'>
        <Leftbar/>
        <div className='flex-grow'>
            <AllConnection/>
        </div>
    </div>
  )
}

export default FindConnection