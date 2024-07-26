import React,{useState}from 'react'
import axios from 'axios'

type DropDownProps={
    isGroup:boolean;
}

const More:React.FC<DropDownProps> = ({isGroup}) => {

    const [isOpen,setIsOpen]=useState(false)
    const toggleDropdown=()=>setIsOpen(!isOpen)
    const handleOption = (option: string) => {
        console.log(`Selected option: ${option}`);
        setIsOpen(false);
      };

  return (
    <div className='relative'>
        <button onClick={toggleDropdown}    className="text-gray-600 hover:text-gray-800 focus:outline-none">
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