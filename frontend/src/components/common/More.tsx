import React, { useEffect, useState } from 'react'
import axios from 'axios'

type DropDownProps = {
    isGroup: boolean;
    receiverId: string;
}

const More: React.FC<DropDownProps> = ({ isGroup, receiverId }) => {

    const [isOpen, setIsOpen] = useState(false)
    const token = localStorage.getItem('user')
    const toggleDropdown = () => setIsOpen(!isOpen)
   

    const handleOption = async (option:string) => {
        try {
            switch (option) {
                case 'Leave channel':
                    await leaveChannel();
                    break;
                case 'Report':
                    await report();
                    break;
                case 'View group':
                    await viewGroup();
                    break;
                case 'Block':
                    await block();
                    break;
                case 'Disconnect':
                    await disconnect();
                    break;
                default:
                    console.log('unknown option');
            }
            setIsOpen(false)
        } catch (err) {
            console.log(`error when choosing ${option}:`, err);
        }
    }

    const leaveChannel = async () => {
        try {
            await axios.post(`http://localhost:3000/user/groupLeft`, { groupId: receiverId }, {
                headers: {
                    authorization: `${token}`
                }
            });
            console.log('Left channel successfully');
        } catch (error) {
            console.error('Error leaving channel:', error);
        }
    };
    const report = async () => {
        try {
            await axios.post(`http://localhost:3000/user/report`, {receiverId }, {
                headers: {
                    authorization: `${token}`
                }
            });
            console.log('report channel successfully');
        } catch (error) {
            console.error('Error report channel:', error);
        }
    };
    const viewGroup = async () => {
        try {
            await axios.get(`http://localhost:3000/user/viewGroup`, {
                headers: {
                    authorization: `${token}`
                },
                params:{receiverId}
            });
            console.log('view successfully');
        } catch (error) {
            console.error('Error view channel:', error);
        }
    };
    const block = async () => {
        try {
            await axios.post(`http://localhost:3000/user/block`, { receiverId }, {
                headers: {
                    authorization: `${token}`
                }
            });
            console.log('block user successfully');
        } catch (error) {
            console.error('Error block channel:', error);
        }
    };
    const disconnect = async () => {
        try {
            await axios.post(`http://localhost:3000/user/remove`, { receiverId }, {
                headers: {
                    authorization: `${token}`
                }
              
            });
            console.log('disconnect user successfully');
        } catch (error) {
            console.error('Error disconnect user:', error);
        }
    };
    // useEffect(()=>{

    // },[handleOption])


    return (
        <div className='relative'>
            <button onClick={toggleDropdown} className="text-gray-600 hover:text-gray-800 focus:outline-none">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                </svg>

            </button>
            {isOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10">
                    <div className="py-1">
                        {isGroup ? (
                            <>
                                <button onClick={() => handleOption('Leave channel')} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left">
                                    Leave channel
                                </button>
                                <button onClick={() => handleOption('Report')} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left">
                                    Report
                                </button>
                                <button onClick={() => handleOption('View group')} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left">
                                    View group
                                </button>
                            </>
                        ) : (
                            <>
                                <button onClick={() => handleOption('Block')} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left">
                                    Block
                                </button>
                                <button onClick={() => handleOption('Disconnect')} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left">
                                    Disconnect
                                </button>
                            </>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default More