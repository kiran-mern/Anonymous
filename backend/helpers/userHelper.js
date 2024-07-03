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
    gCreation: async (data,img)=>{
        const create= await Group.create({
            groupName:data ,image: img
        })
        console.log('created');
        return create
    }


}