import React from 'react';

interface DoorProps {
    color?: string;
    width?: string;
    height?: string;
}

const Door: React.FC<DoorProps> = ({
    color = '#004FFF',
    width = "68",
    height = "63"
}) => {
    return (
        <svg
            width={width}
            height={height}
            viewBox="0 0 68 63"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                d="M0.660156 62.9998V56.3332L7.32682 56.3325V9.11501C7.32682 7.50404 8.47889 6.12361 10.0639 5.83544L41.6357 0.0951097C42.7223 -0.10249 43.7637 0.61831 43.9613 1.70508C43.9827 1.82311 43.9933 1.94288 43.9933 2.06284V6.33251L57.3267 6.33308C59.1677 6.33308 60.66 7.82548 60.66 9.66641V56.3325L67.3267 56.3332V62.9998H53.9933V12.9997L43.9933 12.9992V62.9998H0.660156ZM33.9933 29.6665H27.3268V36.3332H33.9933V29.6665Z"
                fill={color}
            />
        </svg>
    );
};

export default Door;