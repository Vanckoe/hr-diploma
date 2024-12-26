import React from 'react';

interface MailProps {
    color?: string;
    width?: string;
    height?: string;
}

const Mail: React.FC<MailProps> = ({ color = '#814BFF', width = '28', height = '28' }) => {
    return (
        <svg
            width={width}
            height={height}
            viewBox="0 0 28 28"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                d="M25.6668 23.3333V8.16667L23.3335 3.5H4.66683L2.3335 8.17078V23.3333C2.3335 23.9777 2.85584 24.5 3.50016 24.5H24.5002C25.1445 24.5 25.6668 23.9777 25.6668 23.3333ZM6.10862 5.83333H21.8913L23.0579 8.16667H4.94312L6.10862 5.83333ZM10.5002 12.8333H17.5002V15.1667H10.5002V12.8333Z"
                fill={color}
            />
        </svg>
    );
};

export default Mail;
