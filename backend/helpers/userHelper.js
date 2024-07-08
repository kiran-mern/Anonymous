const User = require('../models/Users')
const Group= require('../models/Group')
module.exports = {

    setStatus: async (data,newStatus) => {
        try {
            const user = await User.findOne({ where: { email: data } })
            console.log(user, '44');
            const updated = await User.update(
                { status: newStatus },
                { where: { user_id: user.user_id } }
            )
            console.log(updated,'ss');
            if (updated) {
                console.log('user status updated successfully');
                return updated
            } else {
                console.log('failed to update');
            }

        } catch (err) {

            console.log('error when updating the status', err);
        }
    },
    gCreation: async (data,img,id)=>{
        const create= await Group.create({
            groupName:data ,image: img,user_id:id
        })
        console.log('created');
        return create
    },
    findUser:async(data)=>{
        const user= await User.findOne({where:{email:data}})
        return user
    },
    isActive:async(data)=>{
        try{
            const change= await User.update({isActive:false},{where:{email:data}})
            return change

        }
        catch(err){
            console.error('Error while deactivating',err)
            throw err

        }
       
    },
    findGroup:async(gId,uId)=>{
        const find= await Group.findOne({where:{group_id:gId,user_id:uId}});
        // console.log(find,'ssssssss');
        return find;

    }
    


}