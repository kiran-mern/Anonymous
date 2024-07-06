import React from 'react'
import axios from 'axios';
import { useModalStore } from '../../zustand/store'


const DeactivateModal: React.FC = () => {
    const { isOpen, onConfirm, onClose } = useModalStore();
    if (!isOpen) return null;

    const submit = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('user')
            const response = await axios.post('http://localhost:3000/user/deactivate',{onConfirm},{
                headers: {
                authorization: `${token}`
            }
        })
            if (response.status === 200) {
                console.log('Account deactivated ', response.data);
                onConfirm()
            } else {
                console.log('error');

            }

        } catch (error) {
            console.log(error);
        }
    }

    return (
        <>
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                <div className="bg-gray-800 rounded-lg p-6 max-w-sm w-full">
                    <div className="flex justify-center mb-4">
                        {/* Add your logo here */}
                        <div className="w-12 h-12 bg-gray-700 rounded-full"></div>
                    </div>
                    <p className="text-white text-center mb-6">
                        Are you sure you want to deactivate this account?
                    </p>
                    <div className="flex justify-center space-x-4">
                        <button
                            onClick={onClose}
                            className="px-4 py-2 bg-gray-700 text-white rounded-md hover:bg-gray-600"
                        >
                            Ignore
                        </button>
                        <button
                            onClick={submit}
                            className="px-4 py-2 bg-cyan-500 text-white rounded-md hover:bg-cyan-400"
                        >
                            Confirm
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default DeactivateModal