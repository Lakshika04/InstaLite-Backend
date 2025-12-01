import mongoose from "mongoose";

const storySchema = new mongoose.Schema({
    mediaUrl:{
        type:String,
        required:true,
    },
    author:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true,
    },
    caption:{
        type:String,
    },
    createdAt:{
        type:Date,
        default:Date.now,
        expires:60*60*24,

    },


})

const Story=mongoose.model("Story",storySchema);
export default Story;