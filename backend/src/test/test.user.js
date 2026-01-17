import express from 'express';
import User from '../models/user.model.js'

const router=express.Router();




router.get("/",async(req,res)=>{

    const users=await User.find({});

    res.send(users);
});


export default router;