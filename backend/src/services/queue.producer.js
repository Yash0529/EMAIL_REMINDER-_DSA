
import {Queue} from 'bullmq';
import {fetchQuestions} from '../utils/fetchQuestion.js';
import redisConnection from '../config/redis.connection.js';
import User from '../models/user.model.js'

const emailQueue=new Queue("emailQueue",{connection:redisConnection});

export const emailProducer=async(req,res)=>{
    
    try{
        
        
        const users=await User.find({
            isSubscribed:true
        });


    for(const user of users)
    {
        const questions=await fetchQuestions(user);

        await emailQueue.add(`reminder-${user._id}`,{
            user,
            questions
        },
        {
            attempts:3,
            backoff:{
                type:"exponential",
                delay:5000,
            },
            removeOnComplete:true,
            removeOnFail:false
        }
    )
    }

    res.status(200).json({message:`${users.length} users will get emails.`});

    }
    catch(error){
      res.status(500).json({error:error.message});
    }
}