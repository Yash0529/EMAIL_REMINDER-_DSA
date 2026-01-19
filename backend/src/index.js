import app from './app.js';
import connectDB from './config/db.js'
import cron from 'node-cron';
import { emailScheduler } from './services/email.scheduler.js';


cron.schedule("* * * * *",async()=>{
    emailScheduler();
});

const PORT=process.env.PORT;

app.listen(PORT,()=>{

    connectDB();
    emailScheduler();
    console.log("Server is running");
});

