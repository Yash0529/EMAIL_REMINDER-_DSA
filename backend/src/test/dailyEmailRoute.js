import express from 'express';
import { emailScheduler } from '../services/email.scheduler.js';


const router=express.Router();


router.post("/trigger-daily-emails",emailScheduler);


export default router;