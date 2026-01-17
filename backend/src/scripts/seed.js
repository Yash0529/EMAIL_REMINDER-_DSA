import mongoose from "mongoose";
import axios from "axios";
import Question from "../models/question.model.js";
import dotenv from 'dotenv';

dotenv.config();


const seedDB = async () => {
    try {

        await mongoose.connect(process.env.MONGODB_URL);
        await Question.deleteMany({});

        // 1. Fetch DSA Questions in Batches (to bypass API limits)
        let allDsaData = [];
        const limits = [0, 100, 200, 300, 400]; // Offsets

        console.log("Fetching 500 DSA questions in batches...");
        
        for (const skip of limits) {
            const res = await axios.get(`https://alfa-leetcode-api.onrender.com/problems?limit=100&skip=${skip}`);
            const batch = res.data.problemsetQuestionList.map(q => ({
                title: q.title,
                link: `https://leetcode.com/problems/${q.titleSlug}/`,
                difficulty: q.difficulty,
                category: "DSA",
                topic: q.topicTags?.[0]?.name.toLowerCase() || "general"
            }));
            allDsaData = [...allDsaData, ...batch];
            console.log(`Fetched batch starting at ${skip}...`);
        }

        // 2. Fetch MERN Questions from Multiple GitHub Sources
        const mernSources = [
            'https://raw.githubusercontent.com/sudheerj/reactjs-interview-questions/master/README.md',
            'https://raw.githubusercontent.com/sudheerj/javascript-interview-questions/master/README.md',
            'https://raw.githubusercontent.com/jimuyouyou/node-interview-questions/master/README.md'
        ];

        let allMernData = [];
        console.log("Scraping MERN sources...");

        for (const url of mernSources) {
            const { data } = await axios.get(url);
            const matches = data.matchAll(/###?\s*(?:\d+\.)?\s*(.*)/g);

            
            for (const match of matches) {

                
                if (match[1].length > 15) {
                    allMernData.push({
                        title: match[1].trim(),
                        link: url,
                        difficulty: "Medium",
                        category: "MERN",
                        topic: url.includes('react') ? 'react' : url.includes('node') ? 'node' : 'javascript'
                    });
                }
            }
        }

        // 3. Combine and Insert
        const finalPool = [...allDsaData, ...allMernData];
        await Question.insertMany(finalPool, { ordered: false });

        console.log(`✅ TOTAL QUESTIONS SEEDED: ${finalPool.length}`);
        console.log(`DSA: ${allDsaData.length} | MERN: ${allMernData.length}`);
        process.exit();

    } catch (error) {
        console.error("Seed Error:", error);
        process.exit(1);
    }
};

seedDB();