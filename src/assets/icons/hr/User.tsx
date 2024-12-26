import React from 'react';

interface UserProps {
    color?: string;
    width?: string;
    height?: string;
}

const User: React.FC<UserProps> = ({ color = '#814BFF', width = '28', height = '28' }) => {
    return (
        <svg
            width={width}
            height={height}
            viewBox="0 0 28 28"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                d="M3.5 5.82761C3.5 4.5421 4.54139 3.5 5.82761 3.5H22.1724C23.4579 3.5 24.5 4.54139 24.5 5.82761V22.1724C24.5 23.4579 23.4586 24.5 22.1724 24.5H5.82761C4.5421 24.5 3.5 23.4586 3.5 22.1724V5.82761ZM7.41635 21H20.8221C19.3462 18.8842 16.8944 17.5 14.1192 17.5C11.344 17.5 8.89212 18.8842 7.41635 21ZM14 15.1667C16.2552 15.1667 18.0833 13.3385 18.0833 11.0833C18.0833 8.82817 16.2552 7 14 7C11.7448 7 9.91667 8.82817 9.91667 11.0833C9.91667 13.3385 11.7448 15.1667 14 15.1667Z"
                fill={color}
            />
        </svg>
    );
};

export default User;
