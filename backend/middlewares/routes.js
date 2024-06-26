const express=require('express')

const indexRouter=require('../routes/index')
const userRouter=require('../routes/user')
const adminRouter=require('../routes/admin')


const routerMiddleware=()=>{
    const router=express.Router();

    router.use('/',indexRouter)
    router.use('/user',userRouter) 
    router.use('/admin',adminRouter) 


    return router;
}
module.exports=routerMiddleware;