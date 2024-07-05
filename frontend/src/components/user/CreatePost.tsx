import React, { useState } from 'react'
import { useModalStore } from '../../zustand/store'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const CreatePost: React.FC = () => {

    const [content, setContent] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState(null)
    // const [showDropdown,setShowDropdown]= useState(false)

    const { showModal, setShowModal } = useModalStore();
    const navigate = useNavigate()
    const closeModal = () => {
        setShowModal(false);
        navigate('/home');
    };

    const submitPost = async (e) => {
        e.preventDefault()
        setIsLoading(true)
        try {
            const token = localStorage.getItem('user')
            const response = await axios.post('http://localhost:3000/user/createPost', {
                token,
                content
            }, {
                headers: { 'Content-Type': 'application/json' },
            })
            if (response.status === 200) {
                console.log('Post created successfully', response.data);
                setContent('')
                setShowModal(false);
            } else {
                setError(response.data.message || 'error')
            }

        }
        catch (error) {
            console.log(error);
        }

    }
    if (!showModal) return null;
    return (
        <>
            <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
                <div className="bg-gray-900 text-white rounded-lg p-4 w-96">
                    <h2 className="text-xl font-bold mb-4">Create new post</h2>
                    <form onSubmit={submitPost}>
                        <textarea
                            className="w-full h-24 bg-gray-800 text-white rounded-lg p-2 mb-4"
                            placeholder="Text here ..." value={content}
                            onChange={(e) => setContent(e.target.value)}
                        ></textarea>
                        <div className="flex justify-end">
                            <button
                                className="bg-gray-700 text-white px-4 py-2 rounded-lg mr-2"
                                onClick={closeModal}
                            >
                                Cancel
                            </button>
                            <button className="bg-blue-500 text-white px-4 py-2 rounded-lg"
                                disabled={isLoading}>
                                {isLoading ? 'Sharing...' : 'Share'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>

        </>
    )
}

export default CreatePost