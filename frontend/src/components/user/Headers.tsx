import React from 'react';
import Leftbar from './Leftbar';
import Rightbar from './Rightbar'
import Post from './Post';

const Header = () => {
  return (
    <div className="flex">
      <Leftbar />
      <div className="flex-1 bg-black text-white p-4 overflow-y-auto">
        <div className="flex justify-center space-x-4 mb-4">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="w-12 h-12 bg-gray-700 rounded-full"></div>
          ))}
        </div>
        <div className="border border-gray-600">
          <Post />
          <Post />
          <Post />
        </div>  
      </div>
      <Rightbar/>
    </div>
  );
};

export default Header;
