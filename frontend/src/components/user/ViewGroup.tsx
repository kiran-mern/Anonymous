import React, { useState } from 'react';
import axios from 'axios';
import More from '../common/More';

type GroupMember={
  name: string;
  isAdmin?: boolean;
  avatar: string;
}

type GroupDetailsProps={
    groupId:number,
  groupName: string;
  memberCount: number;
  members: GroupMember[];
}

const GroupDetails: React.FC<GroupDetailsProps> = ({groupId, groupName, memberCount, members }) => {
    const [groupDetails,setGroupDetails]= useState<any>(null)

    const token = localStorage.getItem('user');
    // const handleViewGroup = () => {
    //     console.log('handleViewGroup called');
    // };
    const handleViewGroup = async () => {
        console.log('1');
        
        try {
          const response = await axios.get('http://localhost:3000/user/viewGroup', {
            headers: {
              authorization: `${token}`
            },
            params: { groupId }
          });
          console.log('fghjkdfghjdfghj');
          
          setGroupDetails(response.data.members);
        } catch (error) {
          console.error('Error viewing group:', error);
        }
      };      
  
  return (
    <div className="bg-gray-900 text-white p-4 rounded-lg">
      <div className="flex items-center mb-4">
        <div className='flex items-center'> 
        <div className="w-12 h-12 bg-yellow-500 rounded-full flex items-center justify-center text-2xl font-bold mr-3">
          {groupName[0]}
        </div>
        <div>
          <h2 className="text-xl font-semibold">{groupName}</h2>
          <p className="text-sm text-gray-400">{memberCount} members</p>
        </div>
        </div>
        <More isGroup={true} receiverId={groupId} onViewGroup={handleViewGroup} />
          </div>
          {groupDetails ? (
        <div className="mb-4">
          {/* Display additional group details here */}
          <p>Group Description: {groupDetails.description}</p>
          {/* Add more details as needed */}
        </div>
      ) : null}
      
      <div className="space-y-2">
        {members.map((member, index) => (
          <div key={index} className="flex items-center justify-between">
            <div className="flex items-center">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center mr-3 ${member.avatar.includes('D') ? 'bg-yellow-500' : 'border-2 border-yellow-500'}`}>
                {member.avatar.includes('D') ? 'D' : ''}
              </div>
              <span>{member.name}</span>
              {member.isAdmin && <span className="ml-2 text-xs text-gray-400">(admin)</span>}
            </div>
            <button className="text-gray-400">...</button>
          </div>
        ))}
      </div>
    </div>
  );

};

export default GroupDetails;