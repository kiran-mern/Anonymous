import React,{useEffect, useState} from 'react';
import axios from 'axios';

type Group ={
  id: string;
  name: string;
  imageUrl: string;
}

type AvailableGroupsProps ={
  groups: Group[];
  onJoinGroup: (groupId: string) => void;
}
const token=localStorage.getItem('user')


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
// const App: React.FC = () => {
//   const sampleGroups: Group[] = [
//     { id: '1', name: 'Group_name', imageUrl: '/path/to/image1.jpg' },
//     { id: '2', name: 'Group_name', imageUrl: '/path/to/image2.jpg' },
//     // ... add more groups as needed
//   ];

//   const handleJoinGroup = (groupId: string) => {
//     console.log(`Joining group with id: ${groupId}`);
//     // Implement join group logic here
//   };

//   return (
//     <div className="flex">
//       {/*  existing LeftSidebar component  */}
//       <div className="flex-grow">
//         <AvailableGroups groups={sampleGroups} onJoinGroup={handleJoinGroup} />
//       </div>
//     </div>
//   );
// };

// export default App;

const App : React.FC=()=>{

    const [group,setGroup]=useState<Group[]>([]);
    useEffect(()=>{
        // const token=localStorage.getItem('user')
        const fetchData=async ()=>{
            try{
                const response=await axios.get('http://localhost:3000/user/allGroups',{
                    headers:{
                        authorization:`${token}`
                    }
                })
                console.log(response,'dfv');
                
                const groupData= await response.data.data.map((group:any)=>({
                    id:group.group_id,
                    name:group.groupName
                }))
                setGroup(groupData)
    
            }catch(err){
                console.log('error while joining group ',err);
                
    
            }

        };
        fetchData();
       

    },[]) 
    const handleGroup=async (groupId: string)=>{
        try{
            const response=await axios.post('http://localhost:3000/user/joinGroup',{groupId},
                {
                    headers:{
                        authorization:`${token}`
                    }

                }
            )
            console.log(response,'kkj');

            

        }catch(err){
            console.log(err,"error while joining group")

        }


    }
    return (
        <div className="flex">
          {/* Your existing LeftSidebar component would go here */}
          <div className="flex-grow">
            <AvailableGroups groups={group} onJoinGroup={handleGroup} />
          </div>
        </div>
      );
}
export default App;