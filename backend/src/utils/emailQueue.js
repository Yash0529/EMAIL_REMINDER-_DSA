import { Queue } from "bullmq";
import redisConnection from "../config/redis.connection.js";

const emailQueue = new Queue("emailQueue", {
  connection: redisConnection,
});

export default emailQueue;
