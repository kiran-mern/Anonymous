import React,{useState,useEffect} from "react";
import axios, { AxiosResponse } from "axios";
import {useNavigate,Link} from 'react-router-dom'
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

type Login={
    email: string;
    password: string
}
type LoginResponse={
    token: string;
    role: 'admin' | 'user';
    message?: string;

}
type LoginProps={
  head: string
}
type LoginError = {
    response: {
        data: {
            message: string;
        };
    };
};

const Login:React.FC <LoginProps> = ({head}) => {

    const navigate= useNavigate();
const [email,setEmail]=useState('')
const [password,setPassword]=useState('') 
const [userId,setUserId]=useState('')
const handleLogin= async(e:React.FormEvent)=>{
  e.preventDefault();
      try {
        const response: AxiosResponse<LoginResponse> = await axios.post(`http://localhost:3000/${head==='admin'? 'admin' : 'user'}/login`, {
          email,
          password,
          userId
        });
        handleLoginResponse(response);
      } catch (error) {
        handleLoginError(error as LoginError);
      }
    };

    const handleLoginResponse  = (response:AxiosResponse<LoginResponse>) => {
        const token = response.data.token;
        console.log('restttt',response);
    
          if (response.data.role==='admin') {
            localStorage.setItem("admin", token);
    
            navigate('/signup');
          }else if(response.data.role==='user'){
            localStorage.setItem("user", token);
    
            navigate('/home');
        }
    
        // }
        //  else {
        //   toast.error(response.data.message || "Failed to login");
        // }
      };
      const handleLoginError = (error:LoginError) => {
        console.log(error);
        toast.error("Failed to login");
      };

  return (
    <div className="min-h-screen flex  items-center justify-center ">
      <div className="bg-white shadow-xl rounded-xl flex w-full max-w-6xl overflow-hidden">
        {/* Left Section */}
        <div className="hidden lg:flex xl:w-3/5 justify-center items-center p-8">
          <img
            src="../../../public/images/modern-black-phone-smartphone-on-white-background-with-blank-screen-vector.jpg"
            alt="Anonymous"
            className="w"
          />
        </div>

        {/* Right Section */}
        <div className="w-full lg:w-1/3 p-8">
          <h2 className="text-4xl font-bold mb-8 text-center" style={{ fontFamily: 'Kavoon, cursive' }}>Anonymous</h2>
          <p className="text-xl text-center mb-6 opacity-50">Sign up to see <br /> the mirage world</p>
          <div className="mb-6">
            <a
              href="#"
              className="w-full py-2 px-4 text-blue-500 mt-[-2px] flex items-center justify-center"
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
          <form className="space-y-4" method="POST" onSubmit={handleLogin}>
            <div>
              <input
                type="text"
                name='email'
                value={email}
                onChange={(e)=>setEmail(e.target.value)}
                placeholder="Email"
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>
            <div>
              <input
                type="password"
                name='password'
                value={password}
                onChange={(e)=>setPassword(e.target.value)}

                placeholder="Password"
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>
            <button
              type="submit"
              className="w-full py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
            >
              Log in
            </button>
          </form>
          <div className="mt-6 text-center">
            <p>
              Dont have an account?{' '}
              <a href="/login" className="text-blue-600 hover:underline">
                Sign up
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
