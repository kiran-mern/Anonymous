import React from 'react';
import { Link } from 'react-router-dom';

const RightSidebar = () => {
  return (
    <div className="w-1/6 h-screen bg-black text-white p-4 border text-center">
      <div className="flex flex-col items-center">
        <div className="w-24 h-24 bg-gray-700 rounded-full mb-4"></div>
        <h2 className="text-xl font-bold mb-4">Profile_name</h2>
        <ul className="w-full">
          <li className="mb-4"><Link to="/find" className="text-white">Find Connections</Link></li>
          <li className="mb-4"><Link to="/status" className="text-white">Status</Link></li>
          <li className="mb-4"><Link to="/create/group" className="text-white">Create group</Link></li>
          <li className="mb-4"><Link to="/groups" className="text-white">Groups</Link></li>
        </ul>
      </div>
    </div>
  );
};

export default RightSidebar;
