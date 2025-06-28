import {Resend} from 'resend';
import {EmailTemplate} from "@/app/(my-app)/[locale]/components/email-template";

/**
 * Instantiates the Resend client using the API key from environment variables.
 *
 * @constant {Resend} resend - The Resend client for sending emails.
 */
const resend = new Resend(process.env.RESEND_API_KEY);

/**
 * Handles POST requests to send an email using the Resend service.
 *
 * This function extracts the email details from the request body, generates the email content
 * using a React component, and sends the email via the Resend API.
 *
 * @async
 * @function POST
 * @param {Request} request - The incoming HTTP request containing email details in JSON format.
 * @returns {Promise<Response>} A JSON response indicating success or failure.
 */
export async function POST(request: Request) {
    try {
        // Parse the request body to extract email details
        const {name, email, subject, message} = await request.json();

        // Send the email using the Resend client
        const { data, error } = await resend.emails.send({
            from: 'mail@jerome-greder.com',
            to: ['jerome.greder@icloud.com'],
            subject: `${subject}`,
            react: await EmailTemplate({ name, email, message }),
        });

        // Return an error response if the email sending fails
        if (error) return Response.json({error}, {status: 500});

        // Return a success response with the email data
        return Response.json({data});
    } catch (error) {
        // Handle unexpected errors and return an error response
        return Response.json({error}, {status: 500});
    }
}
