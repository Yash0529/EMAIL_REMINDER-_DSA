import express from 'express';
import {sendMail} from '../config/mail.js'
import {dailyReminderTemplate} from '../utils/emailTemplate.js'


const router=express.Router();


router.get("/test-styled-email", async (req, res) => {
    const testData = {
        userName: "Yash",
        streak: 12,
        solvedToday: 4,
        questions: [
            { title: "Two Sum", topic: "Array", difficulty: "Easy" },
            { title: "Implement UseEffect", topic: "React", difficulty: "Medium" },
            { title: "B-Tree Traversal", topic: "DSA", difficulty: "Hard" }
        ]
    };

    try {
        await sendMail({
            to: "pal249644@gmail.com",
            subject: "Preview: Your Daily Challenge",
            html: dailyReminderTemplate(testData)
        });
        res.send("Styled email sent!");
    } catch (err) {
        res.status(500).send(err.message);
    }
});


export default router;