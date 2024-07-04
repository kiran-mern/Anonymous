import React, { useState } from 'react';
import axios from 'axios';

type Person = {
  id: string;
  name: string;
}

type CreateGroupModalProps ={
  isOpen: boolean;
  onClose: () => void;
  onCreateGroup: (groupName: string, members: string[]) => void;
}

const CreateGroupModal: React.FC<CreateGroupModalProps> = ({ isOpen, onClose, onCreateGroup }) => {
  const [groupName, setGroupName] = useState('');
  const [selectedMembers, setSelectedMembers] = useState<string[]>([]);

  const availableMembers: Person[] = [
    { id: '1', name: 'Person_name' },
    { id: '2', name: 'Person_name' },
    { id: '3', name: 'Person_name' },
    { id: '4', name: 'Person_name' },
    { id: '5', name: 'Person_name' },
  ];

  const token= localStorage.getItem('user')

  const handleCreateGroup = async() => {
    try{
        const response=await axios.post('http://localhost:3000/user/createGroup',{
            name:groupName, image: 'lalala'
        },
    {headers:{
        authorization: `${token}`
    }})

        onCreateGroup(groupName, selectedMembers);
        onClose();
    }catch{

    }
  };

  const toggleMember = (id: string) => {
    setSelectedMembers(prev => 
      prev.includes(id) ? prev.filter(memberId => memberId !== id) : [...prev, id]
    );
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-gray-900 h-4/5 w-80 p-4 rounded-lg flex flex-col">
        <div className="flex justify-between mb-4">
          <button onClick={onClose} className="text-white">Cancel</button>
          <button onClick={handleCreateGroup} className="text-white">Create</button>
        </div>
        
        <div className="mb-4 flex justify-center">
          <div className="w-20 h-20 bg-gray-700 rounded-full flex items-center justify-center">
            <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
          </div>
        </div>

        <input
          type="text"
          placeholder="Group_name"
          value={groupName}
          onChange={(e) => setGroupName(e.target.value)}
          className="bg-gray-800 text-white p-2 rounded mb-4"
        />

        <div className="flex-grow overflow-y-auto">
          {availableMembers.map(person => (
            <div 
              key={person.id} 
              className={`flex items-center p-2 ${selectedMembers.includes(person.id) ? 'bg-gray-700' : 'bg-gray-800'} mb-2 rounded`}
              onClick={() => toggleMember(person.id)}
            >
              <div className="w-8 h-8 bg-gray-600 rounded-full mr-2"></div>
              <span className="text-white">{person.name}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CreateGroupModal;