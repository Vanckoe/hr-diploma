import React from 'react';

interface OpenBtmProps {
    color?: string;
    width?: string;
    height?: string;
}

const OpenBtm: React.FC<OpenBtmProps> = ({
    color = 'white',
    width = '80',
    height = '80',
}) => {
    return (
        <svg
            width={width}
            height={height}
            viewBox="0 0 80 80"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <circle
                cx="40"
                cy="40"
                r="39"
                fill="#004FFF"
                stroke="white"
                strokeWidth="2"
            />
            <circle
                opacity="0.34"
                cx="39.9995"
                cy="39.9995"
                r="31.2271"
                fill="#447EFF"
                stroke="white"
                strokeDasharray="4 4"
            />
            <circle
                opacity="0.4"
                cx="40.0192"
                cy="40.0192"
                r="19.0192"
                fill="white"
            />
            <path
                d="M35.117 48.4971L29.6299 49.6294L30.8492 44.5341C30.0711 43.1829 29.6299 41.6392 29.6299 39.9997C29.6299 34.6814 34.2729 30.3701 40.0003 30.3701C45.7276 30.3701 50.3706 34.6814 50.3706 39.9997C50.3706 45.318 45.7276 49.6294 40.0003 49.6294C38.2347 49.6294 36.5722 49.2197 35.117 48.4971Z"
                fill="white"
            />
        </svg>
    );
};

export default OpenBtm;
