import {Resend} from 'resend';
import {EmailTemplate} from "@/app/(my-app)/[locale]/components/email-template";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
    try {
        const {name, email, subject, message} = await request.json();

        const {data, error} = await resend.emails.send({
            from: 'mail@jerome-greder.com',
            to: ['jerome.greder@icloud.com'],
            subject: `${subject}`,
            react: EmailTemplate({name, email, message}),
        });

        if (error) return Response.json({error}, {status: 500});

        return Response.json({data});
    } catch (error) {
        return Response.json({error}, {status: 500});
    }
}
