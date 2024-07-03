const cron = require('node-cron')
const Group= require('../models/Group')
const {Op, DATE}=require('sequelize')

module.exports={
    deleteOldGroup:async()=>{
        const dayAgo=new DATE((DATE.now()-24*60*60*1000 ))
        try{
            

        }catch(err){
            console.log('error while deleting',err);
        }
    }

}