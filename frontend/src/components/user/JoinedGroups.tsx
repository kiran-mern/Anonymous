import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import { useModalStore } from '../../zustand/store'

type Group = {
    groupName: string,
    groupId: number,
}


const JoinedGroups = () => {
    const [groups, setGroups] = useState<Group[]>([])
    const { connectedGroups,setConnectedGroups, setSelectedUser } = useModalStore()
    const navigate = useNavigate()
    // const {sel}=useModalStore
    const handleGroupClick = (groupId: number) => {
        const selectedGroup = connectedGroups.find(group => group.groupId === groupId)
        if (selectedGroup) {
            setSelectedUser(selectedGroup);
            navigate('/message')
        }
        // else{
        //     const groupToAdd= groups.find(group=>group.groupId===groupId)
        //     if(groupToAdd){
        //         setConnectedGroups([...connectedGroups,groupToAdd])
        //         setSelectedUser({
        //             id:
        //         })
        //     }
        // }
    }

    const token = localStorage.getItem('user')

    useEffect(() => {
        const allGroups = async () => {
            try {
                const response = await axios.get('http://localhost:3000/user/joinedGroups', {
                    headers: {
                        authorization: `${token}`
                    }
                })
                console.log(response, 'varuaayrkkum');

                const groupsData = response.data.group
                setGroups(groupsData)
                setConnectedGroups(groupsData)


            } catch (err) {
                console.log(err, 'error on showing all groups for the users');
            }
        }
        allGroups();
    }, [token,setConnectedGroups])
    return (
        <>
            {/* <div className="flex justify-center space-x-4 mb-4 overflow-x-auto">
            {[...Array(8)].map((_, i) => (
                <div key={i} className="w-12 h-12 bg-gray-700 rounded-full"></div>
            ))}
          </div> */}

            <div className="flex  space-x-4 mb-4 overflow-x-auto">
                {groups.length === 0 ? (
                    <div className="w-12 h-12 bg-gray-700 rounded-full flex items-center justify-center cursor-pointer">
                        <span className="text-white text-xl">+</span>
                    </div>
                ) : (
                    groups.slice(0, 8).map((group, index) => (
                        // <div key={group.groupId} className="flex flex-col items-center">
                        <div
                            key={group.groupId}
                            className="flex flex-col items-center cursor-pointer"
                            onClick={() => handleGroupClick(group.groupId)}
                        >
                            {/* <Link to='/message'>  */}

                            <div className="w-10 h-10 bg-gray-700 rounded-full flex items-center justify-center cursor-pointer">
                                <span>{group.groupName.charAt(0)}</span> {/* Displaying the first letter of the group name */}
                            </div>
                            <span className="text-sm text-center mt-1">{group.groupName}</span>
                            {/* </Link> */}

                        </div>
                    ))
                )}
                {groups.length > 8 && (
                    <div className="w-12 h-12 bg-gray-700 rounded-full flex items-center justify-center cursor-pointer">
                        <span className="text-white text-lg">...</span> {/* Indicating there are more groups */}
                    </div>
                )}
            </div>
        </>
    )
}

export default JoinedGroups;