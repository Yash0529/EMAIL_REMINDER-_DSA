import mongoose from "mongoose";


const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    name:{
        type:String,
        unique:true,
        required:true
    },
    dailyQuestionCount:{
        type:Number,
        default:5,
        min:1,
        max:20
    },
    topicFlow:[
        {
            topic:String,
            order:Number
        }
    ],
    preferredTime:{
        type:String,
        default:"07:00"
    },
    isActive:{
        type:Boolean,
        default:true,
    }
},{timestamps:true});


const User=mongoose.model("User",userSchema);


export default User;