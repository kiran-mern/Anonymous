import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import FeelingModal from './FeelingsModal';
import CreateGroup from './CreateGroup';
import AvailableGroup from './AvailableGroup';
// import { useModalStore } from '../../zustand/store';

const RightSidebar: React.FC = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [creGroup, setCreGroup] = useState(false);
    const [showAvailableGroup,setShowAvailableGroup]= useState(false)
    
    const [feeling, setFeeling] = useState('')

    const openCre = () => setCreGroup(true);
    const closeCre=()=>setCreGroup(false);
    // const openAll=()=>set
    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);
    const toggleAvailableGroup=()=>setShowAvailableGroup (!showAvailableGroup)
    const handleConfirmFeeling = (feeling: string) => {
        setFeeling(feeling);
        closeModal();
    };
    const handleCreateGroup = (groupName: string, members: string[]) => {
        console.log('Group created:', groupName, members);
        closeCre();
      };
    return (
        <div className="w-1/6 h-screen bg-black text-white p-4 border text-center">
            <div className="flex flex-col items-center">
                <div className="w-24 h-24 bg-gray-700 rounded-full mb-4"></div>
                <h2 className="text-xl font-bold mb-4">Profile_name</h2>
                <ul className="w-full">
                    <li className="mb-4"><Link to="/find" className="text-white">Find Connections</Link></li>
                    <li className="mb-4"><button className="text-white" onClick={openModal} >Status</button></li>
                    <li className="mb-4"><button className="text-white" onClick={openCre} >Create group</button></li>
                    <li className="mb-4"><Link to="/allGroup" className="text-white">Groups</Link></li>
                </ul>
            </div>
            <FeelingModal isOpen={isModalOpen} onClose={closeModal} onConfirm={handleConfirmFeeling} />
            <CreateGroup isOpen={creGroup} onClose={closeCre} onCreateGroup={handleCreateGroup} />
        </div>
    );
};

export default RightSidebar;
