const User = require('../models/Users')
const Group= require('../models/Group');
const GroupMember = require('../models/GroupMembers');
const UserPost= require('../models/UserPost')
const LikePosts= require('../models/Likes')
const Comments= require('../models/Comments')
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

    },
    addMembers:async(gId,uId)=>{
        const create= await GroupMember.create({group_id:gId,user_id:uId})
        return create;

    },
    viewAll:async()=>{
        const view= await UserPost.findAll({})
        // console.log(view,'view')
        return view;
    },
    findLike:async(pId,uId)=>{
        const find= await LikePosts.findOne({where:{post_id:pId,user_id:uId}})
        console.log('find',find);
        return find;

    },
    dLike:async(pId,uId)=>{
        const remove= await LikePosts.destroy({ where: { post_id:pId, user_id :uId} })
        console.log('dLike',this.dLike);
        return remove;

    },
    like:async(pId,uId)=>{
        const like= await LikePosts.create({where:{post_id:pId,user_id:uId}})
        console.log(like,"like");
        return like;
    },
    findLike:async(pId,uId)=>{
        const find= await LikePosts.findOne({where:{post_id:pId,user_id:uId}})
        console.log('find',find);
        return find;

    },
    dLike:async(pId,uId)=>{
        const remove= await LikePosts.destroy({ where: { post_id:pId, user_id :uId} })
        console.log('dLike',remove);
        return remove;

    },
    like:async(pId,uId)=>{
        await LikePosts.create({post_id:pId,user_id:uId})
        const post= await UserPost.findOne({where:{post_id:pId}})
        post.likeCount+= 1

        console.log(post.likeCount,"like");
        return post.likeCount;
    },
    countLikes:async(pId)=>{
        const count= await LikePosts.count({where:{post_id:pId}})
        console.log(count,'count');
        return count ;
    },
    addComment:async(pId,uId,data)=>{
        const result= await Comments.create({post_id:pId,user_id:uId,content:data})
        console.log(result,'cmmnt result');
        return result;
    },
    getComments:async(data)=>{
        const result= await Comments.findAll({where:{post_id:data}})
        console.log(result,'reasss');
        return result;
    }
    


}