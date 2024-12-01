import * as React from 'react';

export interface EmailInterface {
    name: string;
    email: string;
    message: string;
}

export const EmailTemplate: React.FC<Readonly<EmailInterface>> = ({
                                                                      name, message, email
                                                                  }) => {
    return (
        <div>
            <div>
                <h1>Hey, you have a new message from {name}!</h1>
                <h3>
                    Email: {email}
                </h3>
            </div>
            <div>
                <p>{message}</p>
            </div>
        </div>
    );
}
