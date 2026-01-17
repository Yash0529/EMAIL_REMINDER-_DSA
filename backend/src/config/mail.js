import nodemailer from 'nodemailer';



export const getTransporter=()=>{
    return nodemailer.createTransport({
        host:process.env.MAIL_HOST,
        port:Number(process.env.MAIL_PORT),
        secure:false,
        auth:{
            user:process.env.MAIL_USER,
            pass:process.env.MAIL_PASS
        },
        tls: {
        rejectUnauthorized: false // Helps if you're on a restricted network
    }
    })
}

export const sendMail=async({to,subject,html})=>{
    
    const mailTransporter=getTransporter();
    try {
        await mailTransporter.sendMail({
            from:process.env.MAIL_USER,
            to,
            subject,
            html
        });

        console.log("EMAIL SENT SUCCESSFULLY!!");
    } catch (error) {
        console.log("EMAIL couldn't sent !!",error.message);
        throw error;
    }

}

export default sendMail;