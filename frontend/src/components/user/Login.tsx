import {useEffect} from "react";
import axios from "axios";
import {useNavigate,} from 'react-router-dom'

import UserLogin from '../common/login'



const Login = () => {
  let token= localStorage.getItem('user')
    const navigate= useNavigate();
    async function isValid(){
      if(token){
        try{
          const response= await axios.post('http://localhost:3000/user/login',{
            headers:{
              authorization: `${token}`
            }
          })
          console.log(response,'aappaa');
          
          navigate('/home')


        }catch(error){
          console.log(error);
          navigate('/')
          

        }
      }
    }
    useEffect(()=>{
      isValid()
    },[token,navigate])


  return (
   <UserLogin head= {'user'} />
  );
};

export default Login;
