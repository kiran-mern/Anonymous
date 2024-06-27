import React, { useState } from 'react';
import axios from 'axios'
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

type SignupForm = {
  email: string;
  username: string;
  password: string;
}

const SignupPage = () => {
  const navigate= useNavigate();
  const [email,setEmail]=useState('')
  const [name,setName]=useState('')
  const [password,setPassword]= useState('')
  const [error,setError]= useState('')


  const handleSubmit = async(e: React.FormEvent) => {
    e.preventDefault();
    setError('')
    const namePattern = /^[A-Za-z ]{3,}$/;
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordPattern = /^.{6,}$/;

    if (!name.trim() || !namePattern.test(name)) {
      toast.error("Name have minimum 3 letters");
      return;
  }
  if (!email.trim() || !emailPattern.test(email)) {
      toast.error("Invalid email format");
      return;
  }
  if (!password.trim() || !passwordPattern.test(password)) {
      toast.error("Password have minimum 6 characters");
      return;
  }
    try{
      const response=axios.post('http://localhost:3000/users/signup',
        {name,email,password}
      )
      console.log(response,'response');
      if(!response){
        throw new Error('Failed to signup') 
      }else{
        console.log('success');
        toast.success('Signup successful! Redirecting...');
        
        navigate('/email')
      }


    }catch(error){
      console.log(error);
    }
  };

  return (
    <>
    <ToastContainer/>
      <div className="min-h-screen flex flex-col items-center justify-center ">
        <div className="bg-white p-8 rounded-lg shadow-lg w-96 max-w-lg">
          <h2 className="text-4xl font-bold text-center mb-6 mt-[50px]  " style={{ fontFamily: 'Kavoon, cursive' }}>Anonymous</h2>
          <p className=" text-1xl text-center mb-6 opacity-50">Sign up to see <br /> the mirage world</p>
          <div className="mb-6">
            <a
              href="#"
              className="w-full py-2 px-4 text-blue mt-[-2px] flex items-center justify-center"
            >
              <img
                src="https://img.icons8.com/color/16/000000/google-logo.png"
                alt="Google"
                className="mr-2"
              />
              Log in with Google
            </a>
          </div>
          <div className="relative flex py-5 items-center mb-6">
            <div className="flex-grow border-t border-gray-400"></div>
            <span className="flex-shrink mx-4 text-gray-400">OR</span>
            <div className="flex-grow border-t border-gray-400"></div>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <input
                type="email"
                name="email"
                value={email}
                onChange={(e)=>setEmail(e.target.value)}
                placeholder="Email"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
            </div>
            <div className="mb-4">
              <input
                type="text"
                name="name"
                value={name}
                onChange={(e)=>setName(e.target.value)}
                placeholder="Username"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
            </div>
            <div className="mb-6">
              <input
                type="password"
                name="password"
                value={password}
                onChange={(e)=>setPassword(e.target.value)}
                placeholder="Password"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
            </div>
            <div>
              <button
                type="submit"
                className="w-full py-2 px-4 text-white rounded-lg shadow-md"
                style={{ backgroundColor: '#29DFB3' }}
              >
                Sign up
              </button>
            </div>
          </form>

        </div> 
        <div className="w-96 max-w-lg mt-2  ">
          <div className="bg-white p-8 rounded-lg shadow-lg ">
            <p className="text-center mt-[-11px]">
              Have an account?{' '}
              <a href="/login" className="text-blue-600 hover:underline">
                Log in
              </a>
            </p>
          </div>
        </div>
      </div>

    </>
  );

};

export default SignupPage;
 