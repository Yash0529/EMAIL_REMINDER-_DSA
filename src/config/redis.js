import IORedis from "ioredis";

const redisConnection = new IORedis(
  "redis://default:uFoHAQnQAtsNgg0w53tDA4DEXQvUs8K0@redis-14164.crce217.ap-south-1-1.ec2.cloud.redislabs.com:14164"
);

redisConnection.on("connect", () => {
  console.log("Connected to Redis");
});

redisConnection.on("error",(error)=>{
    console.log('Redis connection error',error);
})

const testRedis = async () => {
  await redisConnection.set("test_key", "test_value");
  const value = await redisConnection.get("test_key");
  console.log("Redis test_key value:", value);
};

testRedis();



export default redisConnection;
