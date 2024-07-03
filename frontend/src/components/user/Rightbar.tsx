import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import FeelingModal from './FeelingsModal';
// import { useModalStore } from '../../zustand/store';

const RightSidebar = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [feeling, setFeeling] = useState('')

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);
    const handleConfirmFeeling = (feeling: string) => {
        setFeeling(feeling);
        closeModal();
    };

    return (
        <div className="w-1/6 h-screen bg-black text-white p-4 border text-center">
            <div className="flex flex-col items-center">
                <div className="w-24 h-24 bg-gray-700 rounded-full mb-4"></div>
                <h2 className="text-xl font-bold mb-4">Profile_name</h2>
                <ul className="w-full">
                    <li className="mb-4"><Link to="/find" className="text-white">Find Connections</Link></li>
                    <li className="mb-4"><button className="text-white" onClick={openModal} >Status</button></li>
                    <li className="mb-4"><Link to="/create/group" className="text-white">Create group</Link></li>
                    <li className="mb-4"><Link to="/groups" className="text-white">Groups</Link></li>
                </ul>
            </div>
            <FeelingModal isOpen={isModalOpen} onClose={closeModal} onConfirm={handleConfirmFeeling}/>
        </div>
    );
};

export default RightSidebar;
