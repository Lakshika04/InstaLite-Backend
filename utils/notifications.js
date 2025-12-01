import Notification from "../src/models/notification.js";

const createNotification= async({sender,recipient,type,post})=>{
    if(String(recipient)===String(sender)){
        return
    }
    try {
        await Notification.create({sender,recipient,type,post});
    } catch (error) {
        console.log(error.message)
        res.status(500).json({message:error.message})
    }
}

export default createNotification