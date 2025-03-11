import { VERIFICATION_EMAIL_TEMPLATE, PASSWORD_RESET_REQUEST_TEMPLATE,PASSWORD_RESET_SUCCESS_TEMPLATE } from "./emailTemplate.js"
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

export const sendPasswordResetEmail = async (email, resetURL) => {
	const recipient = [{ email }];

	try {
		const response = await mailtrapClient.send({
			from: sender,
			to: recipient,
			subject: "Reset your password",
			html: PASSWORD_RESET_REQUEST_TEMPLATE.replace("{resetURL}", resetURL),
			category: "Password Reset",
		});
	} catch (error) {
		console.error(`Error sending password reset email`, error);
		throw new Error(`Error sending password reset email: ${error}`);
	}
};

export const sendResetSuccessEmail = async (email) => {
    const recepient = [{email}];

    try {
        const response =  await mailtrapClient.send({
            from: sender,
            to: recepient,
            subject: "Password reset successful",
            html: PASSWORD_RESET_SUCCESS_TEMPLATE,
            category: "Password Reset"
        })
    } catch (error) {
        console.error(`Error sending password sucess email`, error);
		throw new Error(`Error sending password reset sucess email: ${error}`);
    }
}