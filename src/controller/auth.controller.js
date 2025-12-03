import User from "../models/user.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config()

const signup=async(req,res)=>{
    try {
        const {email,name,password,bio,userName}=req.body
        console.log("data fetched successfully",name,email,password,bio)
        const existingUser=await User.findOne({email});
        if(existingUser){
            return res.status(400).json({message:"this user exist already"})
        }
        const salt=await bcrypt.genSalt(15);
        const hashedPassword=await bcrypt.hash(password,salt)

        const newUser= new User({name,email,password:hashedPassword,bio,userName})
        await newUser.save();
        res.status(201).json({message:"new user is created successfully"})
    } catch (error) {
        console.log(error.message)
        res.status(500).json({message:error.message})
    }

}

const login= async(req,res)=>{
    try {
        // const{email,password}=req.body;
        // const user=await User.findOne({email})
        const { email, username, password } = req.body;

        const user = await User.findOne({
        $or: [{ email: email }, { username: username }]
        });

        if(!user){
            return res.status(404).json({message:"this user is not found"})
        }

        const isPasswordValid=await bcrypt.compare(password,user.password)

        if(!isPasswordValid){
            return res.status(401).json({message:"the password is invalid"})
        }

        const token=jwt.sign({id:user._id,email:user.email},process.env.JWT_SECRET_KEY,{expiresIn:'24hr'})
        res.status(200).json({message:"login successfully",user,token})
    } catch (error) {
        console.log(error.message)
        res.status(500).json({message:error.message})
        
    }
}
export{signup,login}