import * as React from 'react';

/**
 * Values rendered into the owner notification email.
 *
 * The API route validates and normalizes these strings before this component is called. React's
 * normal text escaping must remain enabled; do not replace these nodes with raw HTML rendering.
 */
export interface EmailInterface {
    /** Display name supplied by the visitor. */
    name: string;
    /** Validated address also assigned to Resend's `replyTo` header. */
    email: string;
    /** Plain-text message supplied by the visitor. */
    message: string;
}

/**
 * Builds the React Email body sent to the portfolio owner.
 *
 * The message is rendered as escaped text while `whiteSpace: pre-wrap` preserves the visitor's
 * paragraphs and line breaks without accepting arbitrary HTML.
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
