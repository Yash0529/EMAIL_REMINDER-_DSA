import mongoose from 'mongoose';


const questionSchema=new mongoose.Schema({
    title: { 
        type: String, 
        required: [true, "Question title is required"],
        trim: true
    },
    link: { 
        type: String, 
        required: [true, "Practice link is required"],
    },
    difficulty: { 
        type: String, 
        required: true,
        enum: ['Easy', 'Medium', 'Hard'],
        default: 'Easy'
    },
    category: { 
        type: String, 
        required: true,
        enum: ['DSA', 'MERN'], // Helps in the 50/50 split logic
        index: true // Indexed for faster aggregation
    },
    topic: { 
        type: String, 
        required: true,
        lowercase: true, // Standardizes 'React' vs 'react'
        trim: true,
        index: true 
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

const Question=mongoose.model("Question",questionSchema);


export default Question;