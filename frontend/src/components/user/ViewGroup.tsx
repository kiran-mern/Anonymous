// import React, { useState } from "react";
// import axios from "axios";
// import More from "../common/More";

// type GroupMember = {
//   name: string;
//   isAdmin?: boolean;
//   avatar: string;
// };

// type GroupDetailsProps = {
//   groupId: number;
//   groupName: string;
//   memberCount: number;
//   members: GroupMember[];
// };

// const GroupDetails: React.FC<GroupDetailsProps> = ({
//   groupId,
//   groupName,
//   memberCount,
//   members,
// }) => {
//   const [groupDetails, setGroupDetails] = useState<any>(null);

//   const token = localStorage.getItem("user");
//   // const handleViewGroup = () => {
//   //     console.log('handleViewGroup called');
//   // };
//   const handleViewGroup = async () => {
//     console.log("1");

//     try {
//       const response = await axios.get("http://localhost:3000/user/viewGroup", {
//         headers: {
//           authorization: `${token}`,
//         },
//         params: { groupId },
//       });
//       console.log("fghjkdfghjdfghj");

//       setGroupDetails(response.data.members);
//     } catch (error) {
//       console.error("Error viewing group:", error);
//     }
//   };

//   return (
//     <div className="bg-gray-900 text-white p-4 rounded-lg">
//       <div className="flex items-center mb-4">
//         <div className="flex items-center">
//           <div className="w-12 h-12 bg-yellow-500 rounded-full flex items-center justify-center text-2xl font-bold mr-3">
//             {/* {groupName[0]} */}
//           </div>
//           <div>
//             <h2 className="text-xl font-semibold">{groupName}</h2>
//             <p className="text-sm text-gray-400">{memberCount} members</p>
//           </div>
//         </div>
//         <More
//           isGroup={true}
//           receiverId={groupId}
//           onViewGroup={() => {
//             console.log("More component triggered view");
//             handleViewGroup();
//           }}
//         />
//       </div>
//       {groupDetails ? (
//         <div className="mb-4">
//           {/* Display additional group details here */}
//           <p>Group Description: {groupDetails.description}</p>
//           {/* Add more details as needed */}
//         </div>
//       ) : null}

//       <div className="space-y-2">
//         {members.map((member, index) => (
//           <div key={index} className="flex items-center justify-between">
//             <div className="flex items-center">
//               <div
//                 className={`w-8 h-8 rounded-full flex items-center justify-center mr-3 ${
//                   member.avatar.includes("D")
//                     ? "bg-yellow-500"
//                     : "border-2 border-yellow-500"
//                 }`}
//               >
//                 {member.avatar.includes("D") ? "D" : ""}
//               </div>
//               <span>{member.name}</span>
//               {member.isAdmin && (
//                 <span className="ml-2 text-xs text-gray-400">(admin)</span>
//               )}
//             </div>
//             <button className="text-gray-400">...</button>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default GroupDetails;

// import React from 'react';

// type GroupMember={
//   name: string;
//   isAdmin?: boolean;
//   avatar: string;
// }

// type GroupDetailsProps={
//   groupName: string;
//   memberCount: number;
//   members: GroupMember[];
// }

// const GroupDetails: React.FC<GroupDetailsProps> = ({ groupName, memberCount, members }) => {
//   return (
//     <div className="bg-gray-900 text-white p-4 w-80">
//       <div className="flex items-center mb-4">
//         <div className="w-12 h-12 bg-yellow-500 rounded-full flex items-center justify-center text-2xl font-bold mr-3">
//           {/* {groupName.charAt(0)} */}
//         </div>
//         <div>
//           <h2 className="text-xl font-bold">{groupName}</h2>
//           <p className="text-sm text-gray-400">{memberCount} members</p>
//         </div>
//       </div>
//       <div className="space-y-3">
//         {members.map((member, index) => (
//           <div key={index} className="flex items-center justify-between">
//             <div className="flex items-center">
//               <div className={`w-8 h-8 rounded-full flex items-center justify-center mr-3 ${member.avatar.includes('D') ? 'bg-yellow-500' : 'border-2 border-yellow-500'}`}>
//                 {member.avatar.includes('D') ? 'D' : ''}
//               </div>
//               <span>{member.name}</span>
//             </div>
//             <div className="flex items-center">
//               {member.isAdmin && <span className="text-xs text-gray-400 mr-2">(admin)</span>}
//               <span className="text-gray-400">...</span>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default GroupDetails;

import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

type GroupMember = {
  name: string;
  isAdmin?: boolean;
  avatar: string;
};

type GroupDetailsProps = {
  groupId: number;
  groupName: string;
  memberCount: number;
  members: GroupMember[];
};
const GroupDetailsView: React.FC = () => {
  const { groupId } = useParams<{ groupId: string }>();
  const [groupMembers, setGroupMembers] = useState<GroupMember[]>([]);

  useEffect(() => {
    const groupMembers = async () => {
      const token = localStorage.getItem("user");
      try {
        const response = await axios.get(
          "http://localhost:3000/user/viewGroup",
          {
            headers: {
              authorization: `${token}`,
            },
            params: { groupId },
          }
        );
        console.log(response.data.members,'response.data.members');
        
        setGroupMembers(response.data.members);
      } catch (err) {
        console.error("Error fetching group members:", err);
      }
    };
    groupMembers();
  }, [groupId]);
  return (
    <div className=" h-screen flex-grow bg-gray-900 text-white p-6 rounded-lg max-w-md mx-auto">
      {/* Group Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <div className="w-12 h-12 bg-yellow-500 rounded-full flex items-center justify-center text-2xl font-bold mr-3">
            G
          </div>
          <div>
            <h2 className="text-xl font-semibold">Group_name</h2>
            <p className="text-sm text-gray-400">
              {groupMembers.length} members
            </p>
          </div>
        </div>
        <button className="text-gray-400 hover:text-white">
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"
            />
          </svg>
        </button>
      </div>

      {/* Member List */}
      <div className="space-y-4">
        {groupMembers.map((member, index) => (
          <div key={index} className="flex items-center justify-between">
            <div className="flex items-center">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center mr-3 ${
                  member.avatar ? "bg-yellow-500" : "border-2 border-yellow-500"
                }`}
              >
                {member.avatar && "D"}
              </div>
              <span>{member.name}</span>
              {member.isAdmin && (
                <span className="ml-2 text-xs text-gray-400">(admin)</span>
              )}
            </div>
            <button className="text-gray-400 hover:text-white">...</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GroupDetailsView;
