import nodemailer from "nodemailer";
import dotenv from "dotenv";
// import { MailtrapClient } from "mailtrap";
dotenv.config();


// const TOKEN = process.env.MAILTRAP_TOKEN
// export const mailtrapClient = new MailtrapClient({
//   token: TOKEN,
// });
// export const sender = {
//   email: "hello@demomailtrap.co",
//   name: "Hritvik Tayal",
// };



// Create transporter for nodemailer
export const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL, // Your email
        pass: process.env.EMAIL_PASSWORD, // Your app password
    },
});

//  sender for nodemialer
export const sender = {
  email: process.env.EMAIL, 
  name: "Hritvik Tayal", 
};
