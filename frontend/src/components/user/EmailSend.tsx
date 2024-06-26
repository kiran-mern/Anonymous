import React from 'react'

const EmailSend  = () => {
  return (
    <div className=" h-full flex-flex-col  ">
      <div className="bg-white rounded-lg shadow-md p-8 max-w-sm max-h-3/4 text-center">
        <h1 className="text-3xl font-semibold mb-6 " style={{ fontFamily: 'Kavoon, cursive' }}>Anonymous</h1>
        <div className="flex justify-center mb-6">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center">
            <svg
              className="w-12 h-12 text-green-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
        </div>
        <h2 className="text-2xl font-semibold mb-4">Email sent!</h2>
        <p className="text-gray-700 mb-6">
          We have sent a link to your inbox. Kindly verify your email by clicking the link.
        </p>
        <p className="text-lg font-semibold">Thank You</p>
      </div>
    </div>
  );
};

export default EmailSend