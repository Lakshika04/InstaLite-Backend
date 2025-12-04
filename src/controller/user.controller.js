import createNotification from "../../utils/notifications.js";
import User from "../models/user.js";

const getUserProfile= async(req,res)=>{
    try {
        const {userName}=req.params
        const user=await User.findOne(userName).select("-password").populate("followers","userName").populate("following","userName")
        if(!user){
            return res.status(404).json({message:"this user is not found"})
        }
        res.status(200).json({message:"this user is fetched successfully",user})

    } catch (error) {
        console.log(error.message)
        res.status(500).json({message:error.message})
    }
}

const updateUserProfile= async(req,res)=>{
    try {
        const{name,bio,userName}=req.body
        const updateUser= await User.findByIdAndUpdate(req.user._id,{name,bio,userName},{new:true})
        res.status(200).json({message:"user profile is updated successfully",updateUser})
    } catch (error) {
        console.log(error.message)
        res.status(500).json({message:error.message})
    }
}
const followRequest = async(req,res)=>{
    try {
     const targetId= req.params._id
     if(String(targetId)===String(req.user._id)){
        return res.status(400).json({message:"you cant follow yourself"})
     }
     const targetUser= await User.findById(targetId)
     const currentUser= await User.findById(req.user._id) 
     if(targetUser.followers.includes(req.user._id)){   
        return res.status(400).json({message:"you've already followed this account"})
    } 
    targetUser.followers.push(req.user._id)
    currentUser.following.push(targetId)
    await targetUser.save()
    await currentUser.save()
    await createNotification({recipient:targetUser._id,sender:currentUser._id,type:"follow"})
    res.status(200).json({message:"successfull follow request"})
}
    catch (error) {
        console.log(error.message)
        res.status(500).json({message:error.message})
    }
}

const unfollowUser= async(req,res)=>{
    try {
        const targetId =req.params._id
        if(String(targetId)===String(req.user._id)){
            return res.status(400).json({message:"you can't unfollow yourself"})
        }
        const targetUser=await User.findById(targetId)
        const currentUser=await User.findById(req.user._id)
        if(!targetUser.followers.includes(req.user._id)){
            return res.status(400).json({message:"you are not following this account"})
        }
        targetUser.followers.pop(req.user._id)
        currentUser.following.pop(targetId)
        await targetUser.save()
        await currentUser.save()
        await createNotification({recipient:targetUser._id,sender:currentUser._id,type:"unfollow"})
        res.status(200).json({message:"successfull unfollow request"})
    } catch (error) {
        console.log(error.message)
        res.status(500).json({message:error.message})
    }
}

const getFollowers = async(req,res)=>{
    try {
        const {userId}=req.params
        const user=  await User.findById(userId).populate("followers","name userName" ).select("followers")
        if(!user){
            return res.status(404).json({message:"user not exist"})
        }
        res.status(200).json({message:"followers are fetched successfully"},user.followers)
        
    } catch (error) {
        console.log(error.message)
        res.status(500).json({message:error.message})
    }
}

const getFollowings = async(req,res)=>{
    try {
        const{userId}=req.params
        const user= await User.findById(userId).populate("following","name userName").select("following")
        if(!user){
            return res.status(404).json({message:"user not exist"})
        }
        res.status(200).json({message:"following is fetched successfully"},user.following)
    } catch (error) {
        console.log(error.message)
        res.status(500).json({message:error.message})
    }
}


export{getUserProfile,updateUserProfile,followRequest,unfollowUser,getFollowers,getFollowings}