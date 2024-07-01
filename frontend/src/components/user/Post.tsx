import React from 'react';

const Post = () => {
  return (
    // <div className='border'>

   
    <div className="bg-black text-white p-4 mb-4 border-b border-gray-600 ">
      <div className="flex items-center mb-2">
        <div className="w-10 h-10 bg-yellow-500 rounded-full mr-4"></div>
        <h2 className="font-bold">profile_name</h2>
        <button className="ml-16 bg-gray-700 px-4 py-1 rounded">Connect</button>
      </div>
      <p className="mb-2">
        When there is a will, there is a way. When there is a will there is away.
        When there is will there is a way. Can't wait to start up.
      </p>
      <div className="flex">
        <span className="mr-4">35 likes</span>
        <span>20 comments</span>
      </div>
    </div>
    // </div>
  );
};

export default Post;
