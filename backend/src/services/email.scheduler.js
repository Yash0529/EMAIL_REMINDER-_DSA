import cron from "node-cron";
import { Queue } from "bullmq";
import redisConnection from "../config/redis.connection.js";
import { fetchQuestions } from "../utils/fetchQuestion.js";
import User from "../models/user.model.js";
import dayjs from 'dayjs';
import connectDB from '../config/db.js'


const emailQueue = new Queue("emailQueue", {
  connection: redisConnection
});

connectDB();

export const emailScheduler =async (req,res) => {
    try {
      const now=dayjs();

      const nowFormat=now.format();

      const currentTime = nowFormat.slice(11, 16); // HH:mm

      const users = await User.find({
        isSubscribed: true,
        emailTime: currentTime,
        timezone: "UTC"
      });

      if(!users || users.length===0)
        return null;

      for (const user of users) {
  const questions = await fetchQuestions(user);

  await emailQueue.add(
    `reminder-${user._id}`,
    {
      user,
      questions
    },
    {
      attempts: 3,
      backoff: {
        type: "exponential",
        delay: 5000,
      },
      removeOnComplete: true,
      removeOnFail: false
    }
  );

  console.log(`📧 Job queued for ${user.email}`);
}
    } catch (error) {
      console.error("Scheduler error:", error);
    };
};