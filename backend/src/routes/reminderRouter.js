import express from 'express';
import { emailProducer } from '../services/queue.producer.js';


const router=express.Router();

router.post("/trigger-daily-emails",emailProducer);

export default router