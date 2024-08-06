import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

type GroupMember = {
    user_id:number,
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
  const [groupName,setGroupName]=useState<string>('')
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
        const { groupName, admin, members } = response.data.members
        const updatedMembers=members.map((member:GroupMember)=>({
            ...member,
            isAdmin:member.user_id===admin.user_id,
        }))
        setGroupName(groupName);
        setGroupMembers(updatedMembers);

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
            <h2 className="text-xl font-semibold">{groupName}</h2>
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
