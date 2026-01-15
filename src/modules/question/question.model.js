import mongoose from "mongoose";


const questionSchema=new mongoose.Schema({
   
    title:String,
    link:String,
    topic:String,
    difficulty:String,
    track:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Track"
    },
    source:String,
    sourceId:String
},{timestamps:true});


questionSchema.index({ sourceId: 1, source: 1 }, { unique: true });

const Question=mongoose.model("Question",questionSchema);


export default Question;