const express=require('express')

const userRouter=require('../routes/user')
const adminRouter=require('../routes/admin')


const routerMiddleware=()=>{
    
    const router=express.Router();
    router.use('/user',userRouter)
    router.use('/admin',adminRouter)
    return router;
}
module.exports=routerMiddleware;