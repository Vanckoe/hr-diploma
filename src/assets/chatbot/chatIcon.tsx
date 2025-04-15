import React from 'react';

interface ChatIconProps {
    color?: string;
    width?: string;
    height?: string;
}

const ChatIcon: React.FC<ChatIconProps> = ({
    color = '#484848',
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
            <path
                d="M7.72189 25.7654L0.666992 27.3332L2.23474 20.2782C1.23425 18.4073 0.666992 16.2698 0.666992 13.9998C0.666992 6.63604 6.63653 0.666504 14.0003 0.666504C21.3641 0.666504 27.3337 6.63604 27.3337 13.9998C27.3337 21.3636 21.3641 27.3332 14.0003 27.3332C11.7303 27.3332 9.59286 26.766 7.72189 25.7654Z"
                fill={color}
            />
        </svg>
    );
};

export default ChatIcon;
