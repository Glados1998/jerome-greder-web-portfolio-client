import * as React from 'react';

/**
 * Interface representing the structure of an email.
 */
export interface EmailInterface {
    name: string; // The name of the sender
    email: string; // The email address of the sender
    message: string; // The message content
}

/**
 * React functional component for rendering an email template.
 *
 * @param {Readonly<EmailInterface>} props - The properties containing email details.
 * @returns {JSX.Element} The rendered email template.
 */
export const EmailTemplate = ({
    name, message, email
}: Readonly<EmailInterface>): React.ReactElement => {
    return (
        <div>
            <div>
                <h1>Hey, you have a new message from {name}!</h1>
                <p>
                    Reply to: <a href={`mailto:${email}`}>{email}</a>
                </p>
            </div>
            <div>
                <p style={{whiteSpace: "pre-wrap"}}>{message}</p>
            </div>
        </div>
    );
};
