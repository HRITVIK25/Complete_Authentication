import { VERIFICATION_EMAIL_TEMPLATE } from "./emailTemplate.js"
import { mailtrapClient, sender } from "./mailtrap.config.js"

export const sendVerificationEmail = async (email,verificationToken) => {
    const recepient = [{email}]

    try {
        const response = await mailtrapClient.send({
            from : sender, // sender defined in mailtrap.config.js
            to : recepient, // recepient is the email being recieved in params which is actually the user signing up
            subject: "Verify your email",
            html: VERIFICATION_EMAIL_TEMPLATE.replace("{verificationCode}",verificationToken),
            category: "Email Verification"
        });
    } catch (error) {
        console.log(`error sending email: ${error}`);
        throw new error(`error sending email: ${error}`)
    }
};

export const sendWelcomeEmail = async (email,name) => {
    const recepient = [{email}];

    try {
        const response = await mailtrapClient.send({
            from: sender,
            to: recepient,
            template_uuid: "6cfbf372-4d44-43bc-a09f-abc8117b949b",
            template_variables: {
                "company_info_name": "Auth Comapny",
                "name": name
            }
        });

        console.log("Welcome email sent successfullly");

    } catch (error) {
        console.log(`error sending welcome email: ${error}`);
        throw new error(`error sending welcome email: ${error}`)
    }
}