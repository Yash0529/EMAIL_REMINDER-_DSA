import express from "express";
import User from "../models/user.model.js";
import { createUser, updateUser } from "../controllers/user.controller.js";

const router = express.Router();

router.post("/create-user",createUser);

router.put("/update-user",updateUser);

export default router;
