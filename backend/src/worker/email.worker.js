import { Worker } from "bullmq";
import redisConnection from "../config/redis.connection.js";
import { sendMail } from "../config/mail.js";
import { dailyReminderTemplate } from "../utils/emailTemplate.js";
import User from '../models/user.model.js';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

console.log("Worker started!!")

console.log("Redi url: ", process.env.REDIS_URL);

const emailWorker = new Worker(
  "emailQueue",
  async (job) => {
    // Destructure based on what your router is currently sending
    await mongoose.connect(process.env.MONGODB_URL);
    const { user, questions } = job.data;

    

    // 1. Validation
    if (!user || !questions || questions.length === 0) {
      console.log(`Skipping Job ${job.id}: No user or questions provided.`);
      return; 
    }

    // 2. Format data for the Template
    const emailData = {
      userName: user.userName || "Coder",
      streak: user.stats?.streak || 0,
      solvedToday: user.stats?.solvedToday || 0,
      questions: questions // Array of {title, link, difficulty, topic}
    };

    // 3. Send Email
    await sendMail({
      to: user.email,
      subject: `🚀 Day ${user.stats?.streak || 0}: Your Daily Code Challenge!`,
      html: dailyReminderTemplate(emailData),
    });

    // 4. Update History in DB 
    // Fix: Use user._id because 'userId' was undefined in your previous snippet
    const questionIds = questions.map(q => q._id);
    
    await User.findByIdAndUpdate(user._id, {
        $push: { receivedQuestions: { $each: questionIds } }
    });

    console.log(`✅ Email sent and history updated for: ${user.email}`);
  },
  { 
    connection: redisConnection,
    concurrency: 5 // Process 5 emails at a time
  }
);

emailWorker.on("completed", (job) => {
  console.log("Job Completed:", job.id);
});

emailWorker.on("failed", (job, err) => {
  console.error("Job Failed:", job.id, "Error:", err.message);
});