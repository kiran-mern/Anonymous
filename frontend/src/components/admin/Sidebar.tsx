import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  return (
    <div className="flex bg-black h-screen text-white">
    <div className="bg-black border text-white h-screen p-4 w-1/6 flex flex-col justify-center items-center" >
      <div className="mb-4 justify-center items-center pt-20">
        <img src="../../../public/images/modern-black-phone-smartphone-on-white-background-with-blank-screen-vector.jpg" alt="Admin" className="w-12 h-12 rounded-full mx-auto"/>
        <h2 className="text-center mt-2">Admin</h2>
      </div>
      <ul className='flex-grow p-12  space-y-5'>
        <li className="my-2">
          <Link to="/dashboard" className="text-white">Dashboard</Link>
        </li>
        <li className="my-2">
          <Link to="/reports" className="text-white">Reports</Link>
        </li>
        <li className="my-2">
      <button className="bg-black border border-white text-white w-full py-2 rounded mt-auto">Logout</button>
        </li>
      </ul>
      {/* <button className="bg-red-600 w-1/3  py-2 rounded">Logout</button> */}
    </div>
    </div>
  );
};

export default Sidebar;
