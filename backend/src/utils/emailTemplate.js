export const dailyReminderTemplate = ({ userName, questions, streak, solvedToday }) => {
    // Generate the HTML for the questions list with clickable links
    const questionListHtml = questions.map(q => `
        <div style="background-color: #f4f7f6; padding: 15px; border-radius: 8px; margin-bottom: 10px; border-left: 4px solid #4A90E2;">
            <h4 style="margin: 0;">
                <a href="${q.link}" target="_blank" style="color: #333; text-decoration: none;">${q.title}</a>
            </h4>
            <p style="margin: 5px 0 0; font-size: 12px; color: #666;">
                <span style="background: #e1e8ed; padding: 2px 6px; border-radius: 4px;">${q.topic}</span> 
                <span style="margin-left: 10px; color: ${
                    q.difficulty === 'Hard' ? '#e74c3c' : 
                    q.difficulty === 'Medium' ? '#f39c12' : '#27ae60'
                }; font-weight: bold;">
                    ${q.difficulty}
                </span>
                <a href="${q.link}" target="_blank" style="margin-left: 15px; color: #4A90E2; text-decoration: underline;">Solve Now →</a>
            </p>
        </div>
    `).join('');

    return `
    <!DOCTYPE html>
    <html>
    <body style="font-family: 'Segoe UI', Arial, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 20px; background-color: #fafafa;">
        <div style="max-width: 600px; margin: 0 auto; border: 1px solid #eee; border-radius: 10px; overflow: hidden; background-color: #ffffff;">
            
            <div style="background: #4A90E2; color: white; padding: 25px; text-align: center;">
                <h1 style="margin: 0; font-size: 24px;">Daily Code Challenge</h1>
            </div>
            
            <div style="display: table; width: 100%; background: #2c3e50; color: white; padding: 15px 0;">
                <div style="display: table-cell; text-align: center; width: 50%;">
                    <div style="font-size: 24px; font-weight: bold;">🔥 ${streak}</div>
                    <div style="font-size: 12px; opacity: 0.8;">Day Streak</div>
                </div>
                <div style="display: table-cell; text-align: center; width: 50%; border-left: 1px solid #3e5871;">
                    <div style="font-size: 24px; font-weight: bold;">✅ ${solvedToday}</div>
                    <div style="font-size: 12px; opacity: 0.8;">Solved Today</div>
                </div>
            </div>

            <div style="padding: 30px;">
                <h3 style="margin-top: 0; color: #2c3e50;">Hi ${userName},</h3>
                <p style="font-size: 16px; color: #555;">Ready to level up? Here are your personalized questions for today:</p>
                
                ${questionListHtml}

                <div style="text-align: center; margin-top: 30px;">
                    <a href="https://yourplatform.com/dashboard" 
                       style="background: #4A90E2; color: white; padding: 14px 30px; text-decoration: none; border-radius: 5px; display: inline-block; font-weight: bold;">
                       View Full Dashboard
                    </a>
                </div>
            </div>

            <div style="text-align: center; font-size: 12px; color: #999; padding: 20px; background-color: #f9f9f9;">
                <p style="margin: 0;">You received this because you're subscribed to daily reminders.</p>
                <p style="margin: 5px 0;"><a href="https://yourplatform.com/unsubscribe" style="color: #4A90E2;">Unsubscribe</a> | <a href="https://yourplatform.com/settings" style="color: #4A90E2;">Manage Preferences</a></p>
            </div>
        </div>
    </body>
    </html>
    `;
};