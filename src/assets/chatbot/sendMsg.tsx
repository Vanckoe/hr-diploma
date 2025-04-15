import React from 'react';

interface SendMsgProps {
    color?: string;
    width?: string;
    height?: string;
}

const SendMsg: React.FC<SendMsgProps> = ({
    color = 'white',
    width = '28',
    height = '28',
}) => {
    return (
        <svg
            width={width}
            height={height}
            viewBox="0 0 28 28"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <circle cx="14" cy="14" r="14" fill="#004FFF" />
            <path
                d="M12.3486 14.2689L8.61523 7.53809L21.5383 14.2689L8.61523 20.9996L12.3486 14.2689Z"
                fill={color}
                stroke="white"
            />
        </svg>
    );
};

export default SendMsg;
