import mongoose from "mongoose";


const progressSchema=new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        red:"User",

    },
    currentTopicIndex:{
        type:Number,
        default:0
    },
    lastSentDate:String

},{timestamps:true});


const Progress=mongoose.model("Progress",progressSchema);

export default Progress;