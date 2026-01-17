import app from './app.js';
import connectDB from './config/db.js'
import cron from 'node-cron';
import { emailScheduler } from './services/email.scheduler.js';


cron.schedule("* * * * *",async()=>{
    emailScheduler();
})

app.listen(3001,()=>{

    connectDB();
    emailScheduler();
    console.log("Server is running");
});

