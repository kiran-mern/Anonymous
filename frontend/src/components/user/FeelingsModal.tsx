import React, { useState } from 'react';
import axios from "axios";
import {useNavigate,} from 'react-router-dom'
// import ReactDOM from 'react-dom';

const FeelingsModal = ({ isOpen, onClose,onConfirm }) => {
  const [selectedFeeling, setSelectedFeeling] = useState('');

  
  if (!isOpen) return null;

  const token=localStorage.getItem('user')
//   const navigate= useNavigate()
  const handleConfirm = async() => {
    try{
        const response=await axios.post('http://localhost:3000/user/setStatus',{
            feeling:selectedFeeling
        },
        {
            headers:{
                authorization:`${token}`
            }
        })
        onConfirm(selectedFeeling);
        onClose();
    }catch(err){
        console.log(err);
        onConfirm(selectedFeeling);
        onClose();
    }
  };
  return (
    <>
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-gray-900 p-6 rounded-lg shadow-lg w-80">
        <h2 className="text-white text-lg mb-4">Feeling</h2>
        <div className="space-y-2">
          {['Happy', 'Sad', 'Boring', 'Angry', 'Others'].map((feeling) => (
            <label key={feeling} className="flex items-center text-white">
              <input
                type="radio"
                name="feeling"
                value={feeling}
                checked={selectedFeeling === feeling}
                onChange={() => setSelectedFeeling(feeling)}
                className="form-radio h-4 w-4 text-blue-600"
              />
              <span className="ml-2">{feeling}</span>
            </label>
          ))}
        </div>
        <div className="mt-4 flex justify-end space-x-2">
          <button
            className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            onClick={handleConfirm}
          >
            Confirm
          </button>
        </div>
      </div>
    </div>,
    </>
    
  );
};

export default FeelingsModal;
