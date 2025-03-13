import { transporter, sender } from "./nodemailer.config.js";
import {
    VERIFICATION_EMAIL_TEMPLATE,
    PASSWORD_RESET_REQUEST_TEMPLATE,
    PASSWORD_RESET_SUCCESS_TEMPLATE,
} from "./emailTemplate.js";

// import { mailtrapClient, sender } from "./nodemailer.config.js"

// export const sendVerificationEmail = async (email,verificationToken) => {
//     const recepient = [{email}]

//     try {
//         const response = await mailtrapClient.send({
//             from : sender, // sender defined in nodemailer.config.js
//             to : recepient, // recepient is the email being recieved in params which is actually the user signing up
//             subject: "Verify your email",
//             html: VERIFICATION_EMAIL_TEMPLATE.replace("{verificationCode}",verificationToken),
//             category: "Email Verification"
//         });
//     } catch (error) {
//         console.log(`error sending email: ${error}`);
//         throw new Error(`error sending email: ${error}`)
//     }
// };

// export const sendWelcomeEmail = async (email,name) => {
//     const recepient = [{email}];

//     try {
//         const response = await mailtrapClient.send({
//             from: sender,
//             to: recepient,
//             template_uuid: "6cfbf372-4d44-43bc-a09f-abc8117b949b",
//             template_variables: {
//                 "company_info_name": "Auth Comapny",
//                 "name": name
//             }
//         });

//         console.log("Welcome email sent successfullly");

//     } catch (error) {
//         console.log(`error sending welcome email: ${error}`);
//         throw new Error(`error sending welcome email: ${error}`)
//     }
// }

// export const sendPasswordResetEmail = async (email, resetURL) => {
// 	const recipient = [{ email }];

// 	try {
// 		const response = await mailtrapClient.send({
// 			from: sender,
// 			to: recipient,
// 			subject: "Reset your password",
// 			html: PASSWORD_RESET_REQUEST_TEMPLATE.replace("{resetURL}", resetURL),
// 			category: "Password Reset",
// 		});
// 	} catch (error) {
// 		console.error(`Error sending password reset email`, error);
// 		throw new Error(`Error sending password reset email: ${error}`);
// 	}
// };

// export const sendResetSuccessEmail = async (email) => {
//     const recepient = [{email}];

//     try {
//         const response =  await mailtrapClient.send({
//             from: sender,
//             to: recepient,
//             subject: "Password reset successful",
//             html: PASSWORD_RESET_SUCCESS_TEMPLATE,
//             category: "Password Reset"
//         })
//     } catch (error) {
//         console.error(`Error sending password sucess email`, error);
// 		throw new Error(`Error sending password reset sucess email: ${error}`);
//     }
// }


// Send Verification Email
export const sendVerificationEmail = async (email, verificationToken) => {
    try {
        const response = await transporter.sendMail({
        from: `"${sender.name}" <${sender.email}>`,
        to: email,
        subject: "Verify your email",
        html: VERIFICATION_EMAIL_TEMPLATE.replace(
            "{verificationCode}",
            verificationToken
        ),
        });
        console.log("Verification email sent successfully");
    } catch (error) {
        console.error("Error sending verification email:", error);
        throw new Error(`Error sending verification email: ${error}`);
    }
};

// Send Welcome Email
export const sendWelcomeEmail = async (email, name) => {
    try {
        const response = await transporter.sendMail({
            from: `"${sender.name}" <${sender.email}>`,
        to: email,
        subject: "Welcome to Our Service!",
        html: `<h2>Welcome, ${name}!</h2><p>We're excited to have you on board.</p>`,
        });

        console.log("Welcome email sent successfully");
    } catch (error) {
        console.error("Error sending welcome email:", error);
        throw new Error(`Error sending welcome email: ${error}`);
    }
    };

// Send Password Reset Email
export const sendPasswordResetEmail = async (email, resetURL) => {
    try {
        const response = await transporter.sendMail({
            from: `"${sender.name}" <${sender.email}>`,
            to: email,
            subject: "Reset Your Password",
            html: PASSWORD_RESET_REQUEST_TEMPLATE.replace("{resetURL}", resetURL),
        })

        console.log("Password reset email sent successfully");
    } catch (error) {
        console.error("Error sending password reset email:", error);
        throw new Error(`Error sending password reset email: ${error}`);
    }
};

// Send Password Reset Success Email
export const sendResetSuccessEmail = async (email) => {
    try {
        const response = await transporter.sendMail({
            from: `"${sender.name}" <${sender.email}>`,
            to: email,
            subject: "Password Reset Successful",
            html: PASSWORD_RESET_SUCCESS_TEMPLATE,
        })

        console.log("Password reset success email sent successfully");
    } catch (error) {
        console.error("Error sending password reset success email:", error);
        throw new Error(`Error sending password reset success email: ${error}`);
    }
};
