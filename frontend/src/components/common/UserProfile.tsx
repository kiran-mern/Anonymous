import React from 'react'

type Post={
    id:number,
    profileName:string,
    content:string,
    likes:number,
    comments:number
}

type UserProfileProps={
    displayName:string,
    name:string,
    connectionsCount:number,
    postsCount:number,
    posts:Post[]
}

const UserProfile: React.FC<UserProfileProps> = ({displayName,name,connectionsCount,postsCount,posts})=>{
return(
    <div className=" h-screen flex-grow  bg-black text-white p-6">
    <div className="flex items-center justify-between mb-6">
      <div className="flex items-center">
        <div className="w-12 h-12 bg-yellow-500 rounded-full flex items-center justify-center text-black font-bold text-xl mr-4">
          {/* {displayName.charAt(0)} */}
        </div>
        <div>
          <h2 className="text-2xl font-bold">{displayName}</h2>
          <p className="text-gray-400">@{name}</p>
        </div>
      </div>
      <button className="bg-gray-800 px-4 py-2 rounded-md">Edit profile</button>
    </div>
    <div className="flex mb-6">
      <p className="mr-6">{postsCount} posts</p>
      <p>{connectionsCount} connections</p>
    </div>
    <h3 className="text-xl font-bold mb-4">POSTS</h3>
    {/* <div className="space-y-4">
      {posts.map((post) => (
        <div key={post.id} className="border-t border-gray-800 pt-4">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center">
              <div className="w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center text-black font-bold text-sm mr-2">
                {post.profileName.charAt(0)}
              </div>
              <p className="font-bold">{post.profileName}</p>
            </div>
            <button className="text-gray-400">...</button>
          </div>
          <p className="mb-2">{post.content}</p>
          <div className="flex items-center text-gray-400">
            <button className="flex items-center mr-4">
              <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
              {post.likes}
            </button>
            <button className="flex items-center">
              <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
              {post.comments}
            </button>
          </div>
        </div>
      ))}
    </div> */}
  </div>
)
}

export default UserProfile