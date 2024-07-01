import React from 'react';
import { Link } from 'react-router-dom';

const Leftbar = () => {
  return (
    <div className="w-1/6 h-screen bg-black text-white p-4  border" >
      <h1 className="text-2xl font-bold mb-6 mt-20 flex justify-center" style={{ fontFamily: 'Kavoon, cursive' }}>Anonymous</h1>
      <div className='flex justify-center'>
      <ul className='m'>
        <li className="mb-4">
          <Link to="/home" className="text-white">Home</Link>
        </li>
        <li className="mb-4"><Link to="/message" className="text-white">Messages</Link></li>
        <li className="mb-4"><Link to="/notification" className="text-white">Notifications</Link></li>
        <li className="mb-4"><Link to="/create" className="text-white">Create</Link></li>
        <li className="mb-4"><Link to="/profile" className="text-white">Profile</Link></li>
        <li className="mb-4"><Link to="/more" className="text-white">More</Link></li>
      </ul>
      </div>
    </div>
  );
};

export default Leftbar;
