import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useModalStore } from '../../zustand/store';

const Leftbar = () => {
  const { setShowModal } = useModalStore();
  const [showDropdown, setShowDropdown] = useState(false)
  const [showAppearance, setShowAppearance] = useState(false)
  const [isDarkMode, setIsDarkMode] = useState(false)

  const handleCreateClick = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    e.preventDefault();
    setShowModal(true);
  };
  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
    setShowAppearance(false)
  };
  const handleAppearanceClick = () => {
    setShowDropdown(false); // Close main dropdown when opening appearance dropdown
    setShowAppearance(!showAppearance);
  };
  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    // setShowAppearance(false)

  }
  return (
    <div className="w-1/6 h-screen bg-black text-white p-4  border" >
      <h1 className="text-2xl font-bold mb-6 mt-20 flex justify-center" style={{ fontFamily: 'Kavoon, cursive' }}>Anonymous</h1>
      <div className='flex justify-center'>
        <ul className='m'>
          <li className="mb-4">
            <Link to="/home" className="text-white">Home</Link>
          </li>
          <li className="mb-4"><Link to="/message" className="text-white">Messages</Link></li>
          <li className="mb-4"><Link to="/notification" className="text-white">Notifications</Link></li>
          <li className="mb-4">
            <button className="text-white" onClick={handleCreateClick}>Create</button>
          </li>
          <li className="mb-4"><Link to="/profile" className="text-white">Profile</Link></li>
          <li className="mb-4">
            <button className="text-white" onClick={toggleDropdown}>More</button>
            {showDropdown && (
              <div className="mt-2 w-48 bg-gray-800 rounded-lg shadow-lg">
                <button className="block w-full text-left px-4 py-2 text-white hover:bg-gray-700" onClick={() => {/* Logout logic */ }}>
                  Logout
                </button>
                <button className="block w-full text-left px-4 py-2 text-white hover:bg-gray-700" onClick={handleAppearanceClick}>
                  Appearance
                </button>
               
                <button className="block w-full text-left px-4 py-2 text-white hover:bg-gray-700" onClick={() => {/* Deactivate logic */ }}>
                  Deactivate
                </button>
              </div>
            )}   
              {showAppearance && (
        <div className="mt-2 w-48 bg-gray-800 rounded-lg shadow-lg px-4 py-2">
          <p className="text-white mb-2">Appearance</p>
          
<label className="inline-flex items-center cursor-pointer">
  <input  id="darkModeToggle"
              type="checkbox"
              className="hidden sr-only peer"
              checked={isDarkMode}
              onChange={toggleDarkMode} />
  <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 bg-grey-600 -focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
  <span className="ms-3 text-sm font-medium text-white dark:text-gray-300">Dark mode</span>
</label>

        </div>
      )}
</li>
          
        </ul>
      </div>
    </div>
  );
};

export default Leftbar;
