import React from 'react';
import { Link } from 'react-router-dom';

const FindAnonymous = () => {
  return (
    <div className="flex flex-col items-center justify-center w-screen h-screen bg-black text-white">
      <div className="w-20 h-20 bg-white rounded-full mb-4 flex items-center justify-center">
        <svg className="w-16 h-16 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
        </svg>
      </div>
      <h2 className="text-xl mb-4">Find a new anonymous</h2>
      <Link to='/find'>

      <button className="bg-teal-500 text-white px-4 py-2 rounded-md">
        Connect
      </button>
      </Link>
    </div>
  );
};

export default FindAnonymous;