import React from 'react';

type Group ={
  id: string;
  name: string;
  imageUrl: string;
}

type AvailableGroupsProps ={
  groups: Group[];
  onJoinGroup: (groupId: string) => void;
}

const AvailableGroups: React.FC<AvailableGroupsProps> = ({ groups, onJoinGroup }) => {
  return (
    <div className="bg-black min-h-screen p-6">
      <div className="grid grid-cols-4 gap-4">
        {groups.map((group) => (
          <div key={group.id} className="bg-gray-900 rounded-lg p-4 flex flex-col items-center">
            <div className="w-16 h-16 rounded-full bg-teal-500 flex items-center justify-center mb-2">
              <img src={group.imageUrl} alt={group.name} className="w-14 h-14 rounded-full object-cover" />
            </div>
            <h3 className="text-white text-lg mb-2">{group.name}</h3>
            <button
              onClick={() => onJoinGroup(group.id)}
              className="bg-teal-500 text-white px-4 py-1 rounded-full hover:bg-teal-600 transition-colors"
            >
              Join
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

// Example usage
const App: React.FC = () => {
  const sampleGroups: Group[] = [
    { id: '1', name: 'Group_name', imageUrl: '/path/to/image1.jpg' },
    { id: '2', name: 'Group_name', imageUrl: '/path/to/image2.jpg' },
    // ... add more groups as needed
  ];

  const handleJoinGroup = (groupId: string) => {
    console.log(`Joining group with id: ${groupId}`);
    // Implement join group logic here
  };

  return (
    <div className="flex">
      {/* Your existing LeftSidebar component would go here */}
      <div className="flex-grow">
        <AvailableGroups groups={sampleGroups} onJoinGroup={handleJoinGroup} />
      </div>
    </div>
  );
};

export default App;