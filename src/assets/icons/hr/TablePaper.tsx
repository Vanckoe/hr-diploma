import React from 'react';

interface TablePaperProps {
    color?: string;
    width?: string;
    height?: string;
}

const TablePaper: React.FC<TablePaperProps> = ({
    color = '#814BFF',
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
                d="M7 4.66667V9.33333H21V4.66667H23.341C23.9811 4.66667 24.5 5.18577 24.5 5.82563V24.5077C24.5 25.1477 23.9809 25.6667 23.341 25.6667H4.65897C4.01889 25.6667 3.5 25.1476 3.5 24.5077V5.82563C3.5 5.18555 4.01911 4.66667 4.65897 4.66667H7ZM9.33333 2.33333H18.6667V7H9.33333V2.33333Z"
                fill={color}
            />
        </svg>
    );
};

export default TablePaper;
