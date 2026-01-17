import IORedis from 'ioredis';
import dotenv from 'dotenv';

dotenv.config();

const redisConnection=new IORedis(process.env.REDIS_URL,
    {
        maxRetriesPerRequest: null
    }
);


redisConnection.on("connect",()=>{
    console.log("REDIS Connected");
})


redisConnection.on("error",()=>{
    console.log("ERROR in connecting redis");
})



export default redisConnection;


