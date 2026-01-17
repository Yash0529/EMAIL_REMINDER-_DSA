import Question from "../models/question.model.js";

// Helper to transform MERN links into engaging learning resources
const enhanceMernLink = (title, topic) => {
    
    const query = encodeURIComponent(title);

    switch (topic.toLowerCase()) {
        case 'react':
            return `https://react.dev/learn?q=${query}`;
        case 'javascript':
        case 'js':
            return `https://developer.mozilla.org/en-US/search?q=${query}`;
        case 'node':
        case 'express':
            return `https://google.com/search?q=site:nodejs.org+OR+site:expressjs.com+${query}`;
        case 'mongodb':
            return `https://www.mongodb.com/docs/manual/search/?query=${query}`;
        default:
            return `https://www.google.com/search?q=${topic}+interview+question+${query}`;
    }
};

export const fetchQuestions = async (user) => {
    try {
        const { dsaTopics = [], mernTopics = [], questionCount = 4 } = user.preferences || {};
        
        const normalizedDsa = dsaTopics.map(t => t.toLowerCase());
        const normalizedMern = mernTopics.map(t => t.toLowerCase());

        const dsaCount = Math.ceil(questionCount / 2);
        const mernCount = Math.floor(questionCount / 2);

        // 1. Fetch DSA (Keep original LeetCode links)
        const dsaQuestions = await Question.aggregate([
            {
                $match: {
                    category: "DSA",
                    topic: { $in: normalizedDsa },
                    _id: { $nin: user.receivedQuestions || [] }
                }
            },
            { $sample: { size: dsaCount } }
        ]);

        // 2. Fetch MERN (We will enhance these links below)
        const mernQuestions = await Question.aggregate([
            {
                $match: {
                    category: "MERN",
                    topic: { $in: normalizedMern },
                    _id: { $nin: user.receivedQuestions || [] }
                }
            },
            { $sample: { size: mernCount } }
        ]);

        // Transform MERN links to be more engaging
        const enhancedMern = mernQuestions.map(q => ({
            ...q,
            link: enhanceMernLink(q.title, q.topic)
        }));

        const results = [...dsaQuestions, ...enhancedMern];

        // 3. EMERGENCY FALLBACK
        if (results.length === 0) {
            console.log("No topic match found, fetching random general questions...");
            const fallback = await Question.aggregate([{ $sample: { size: questionCount } }]);
            
            // Even in fallback, enhance the MERN ones
            return fallback.map(q => q.category === "MERN" 
                ? { ...q, link: enhanceMernLink(q.title, q.topic) } 
                : q
            );
        }

        return results;
    } catch (error) {
        console.error("Aggregation Error:", error);
        return [];
    }
};