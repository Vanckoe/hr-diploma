import React from 'react';

interface PortfolioProps {
    color?: string;
    width?: string;
    height?: string;
}

const Portfolio: React.FC<PortfolioProps> = ({
    color = '#814BFF',
    width = '48',
    height = '48',
}) => {
    return (
        <svg
            width={width}
            height={height}
            viewBox="0 0 48 48"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                d="M18 26V32H30V26H44V40C44 41.1046 43.1046 42 42 42H6C4.89544 42 4 41.1046 4 40V26H18ZM22 22H26V28H22V22ZM14 10V4C14 2.89544 14.8954 2 16 2H32C33.1046 2 34 2.89544 34 4V10H42C43.1046 10 44 10.8954 44 12V22H30V18H18V22H4V12C4 10.8954 4.89544 10 6 10H14ZM18 6V10H30V6H18Z"
                fill={color}
            />
        </svg>
    );
};

export default Portfolio;
