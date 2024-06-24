const express=require('express')
const bodyParser=require('body-parser')
const routerMiddleware=require('./middlewares/routes')
const app=express();
app.listen(3000,()=>{
    console.log('server is running');
})
app.use(bodyParser.json())
app.use(routerMiddleware())
app.use(bodyParser.urlencoded({extended:true}))