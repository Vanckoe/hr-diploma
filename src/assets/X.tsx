import React from 'react';

interface XProps {
    color?: string;
    width?: string;
    height?: string;
}

const X: React.FC<XProps> = ({
    color = 'black',
    width = "20",
    height = "20"
}) => {
    return (
        <svg
            width={width}
            height={height}
            viewBox="0 0 20 20" 
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                d="M8.5859 10.0001L0.792969 2.20718L2.20718 0.792969L10.0001 8.58582L17.793 0.792969L19.2072 2.20718L11.4143 10.0001L19.2072 17.7929L17.793 19.2072L10.0001 11.4143L2.20718 19.2072L0.792969 17.7929L8.5859 10.0001Z"
                
                fill={color}
            />
        </svg>

    );
};

export default X;
