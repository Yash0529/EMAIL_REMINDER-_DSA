import IORedis from 'ioredis';

const redisConnection=new IORedis('redis://default:uFoHAQnQAtsNgg0w53tDA4DEXQvUs8K0@redis-14164.crce217.ap-south-1-1.ec2.cloud.redislabs.com:14164',
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


