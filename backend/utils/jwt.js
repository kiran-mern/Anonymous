const jwt=require('jsonwebtoken')
module.exports={
    token : (mail,role,user_id)=>{
        console.log(role,'role');
        const token = jwt.sign({ email:mail,role:role,user_id,}, process.env.secret_key, { expiresIn: '30d' });
        return token
     }

}