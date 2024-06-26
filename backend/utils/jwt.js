const express=require('express')
const jwt=require('jsonwebtoken')
module.exports={
    token : (mail,role)=>{
        console.log(role,'role');
        const token = jwt.sign({ email:mail,role:role}, process.env.secret_key, { expiresIn: '30d' });
        return token
     }

}