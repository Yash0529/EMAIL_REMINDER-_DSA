// models/User.js
import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password:{type: String, required: true},
    userName: String,
    isSubscribed: { type: Boolean, default: true },
    preferences: {
        dsaTopics: [String],   // e.g., ['Arrays', 'Graphs']
        mernTopics: [String],  // e.g., ['React', 'Node.js']
        questionCount: { type: Number, default: 3 }
    },
    stats: {
        streak: { type: Number, default: 0 },
        solvedToday: { type: Number, default: 0 },
        totalSolved: { type: Number, default: 0 }
    },
    emailTime: { 
        type: String, 
        default: "08:00" 
    },
    timezone: { 
        type: String, 
        default: "UTC" 
    },
    receivedQuestions: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Question' }]
});


const User = mongoose.model('User', userSchema);

export default User;