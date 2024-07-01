import { useNavigate } from 'react-router-dom';
import Leftbar from './Leftbar';
import Rightbar from './Rightbar'
import Post from './Post';
import { useModalStore } from '../../zustand/create';

const Header = () => {

    const {showModal,setShowModal}=useModalStore();
    const navigate= useNavigate()
    const closeModal = () => {
        setShowModal(false);
        navigate('/side'); 
      };
  return (
    <div className="flex">
      <Leftbar />
      <div className="flex-1 bg-black text-white p-4 overflow-y-auto">
        <div className="flex justify-center space-x-4 mb-4">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="w-12 h-12 bg-gray-700 rounded-full"></div>
          ))}
        </div>
        <div className="border border-gray-600">
          <Post />
          <Post />
          <Post />
        </div>  
      </div>
      <Rightbar/>
      {showModal && (
         <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
         <div className="bg-gray-900 text-white rounded-lg p-4 w-96">
           <h2 className="text-xl font-bold mb-4">Create new post</h2>
           <textarea
             className="w-full h-24 bg-gray-800 text-white rounded-lg p-2 mb-4"
             placeholder="Text here ..."
           ></textarea>
           <div className="flex justify-end">
             <button
               className="bg-gray-700 text-white px-4 py-2 rounded-lg mr-2"
               onClick={closeModal}
             >
               Cancel
             </button>
             <button className="bg-blue-500 text-white px-4 py-2 rounded-lg">
               Share
             </button>
           </div>
         </div>
       </div>
      )}
    </div>
  );
};

export default Header;
