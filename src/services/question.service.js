import Progres from '../modules/progress/progress.model.js'
import Question from '../modules/question/question.model.js'

export const getDailyQuestions=async(user)=>{

    const progress= (await Progres.findOne({userId:user._id}) || await Progress.create({userId:user._id}));

    const topicFlow=user.topicFlow.sort((a,b)=>a.order-b.order);
    const currentTopic=topicFlow[progress.currentTopicIndex];

    const questions=await Question.find({topic:currentTopic.topic}).limit(user.dailyQuestionCount);


}