import Post from "../models/post.js";

const addPost= async(req,res)=>{
    try {
        const{caption,imageUrl}=req.body
        const posts=await Post.create({caption,imageUrl,author:req.user._id})
        res.status(201).json({message:"post created successfuly",posts})
    } catch (error) {
        console.log(error.message)
        res.status(500).json({message:error.message})
    }
}

const getSinglePost=async(req,res)=>{
    try {
        const {postId}=req.params
        const post =await Post.findById(postId)
        if(!post){
            return res.status(404).json({message:"post not found"})
        }
        res.status(200).json({message:"post fetched successfully",post})
    } catch (error) {
        console.log(error.message)
        res.status(500).json({message:error.message})
    }
}

const deletePost= async(req,res)=>{
    await Post.findByIdAndDelete(req.params.postId)
    res.status(200).json({message:"post is deleted successfully"})
}

export {addPost,getSinglePost,deletePost}