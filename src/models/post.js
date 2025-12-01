import mongoose from "mongoose";
const postSchema= new mongoose.Schema({
    caption:{
        type:String,
        trim:true,
    },
    author:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true,
    },
    imageUrl:{
        type:String,
        required:true,
    },
    likes:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
    }],
   

},{timestamps:true})

const Post=mongoose.model("Post",postSchema)
export default Post