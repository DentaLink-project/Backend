
import nodemailer from "nodemailer";

export const sendEmail =async (to, subject, html)=>{
    try {
const transporter = nodemailer.createTransport({

    service:"gmail",
    auth: {
        user:process.env.EMAIL_SENDER ,
        pass: process.env.PASSWORD,
    },
});

const info = await transporter.sendMail({
    from: `"Dentalkart" <${process.env.EMAIL_SENDER}>`, 
    to:to ? to:"" , 
    subject: subject ? subject:"hi" ,
    html: html ? html:"hello ",
});

console.log( info);
if(info.accepted.length){
    return true
}
return false;
} catch (error) {
    console.error("Error sending email: ", error);
    return false;  
}
}