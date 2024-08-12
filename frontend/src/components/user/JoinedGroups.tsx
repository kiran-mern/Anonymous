import React, { useState, useEffect } from 'react'
import axios from 'axios'

type Group={
    groupName: string,
    groupId:number,
}


const JoinedGroups= () => {
    const [groups,setGroups]= useState<Group[]>([])

    const token = localStorage.getItem('user')

    useEffect(() => {
        const allGroups = async () => {
            try {
                const response = await axios.get('http://localhost:3000/user/joinedGroups', {
                    headers: {
                        authorization: `${token}`
                    }
                })
                console.log(response,'varuaayrkkum');

                const groupsData=response.data.group
                setGroups(groupsData)


            } catch (err) {
                console.log(err, 'error on showing all groups for the users');
            }
        }
        allGroups();
    }, [])
    return (
        <> 
          {/* <div className="flex justify-center space-x-4 mb-4 overflow-x-auto">
            {[...Array(8)].map((_, i) => (
                <div key={i} className="w-12 h-12 bg-gray-700 rounded-full"></div>
            ))}
          </div> */}

          <div className="flex justify-center space-x-4 mb-4 overflow-x-auto">
            {groups.length === 0 ? (
                <div className="w-12 h-12 bg-gray-700 rounded-full flex items-center justify-center cursor-pointer">
                    <span className="text-white text-xl">+</span>
                </div>
            ) : (
                groups.slice(0, 8).map((group, index) => (
                    <div key={group.groupId} className="w-12 h-12 bg-gray-700 rounded-full flex items-center justify-center text-white cursor-pointer">
                        <span>{group.groupName}</span> {/* Displaying the first letter of the group name */}
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