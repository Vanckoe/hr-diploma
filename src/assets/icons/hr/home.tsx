import React from 'react';

interface HomeProps {
    color?: string;
    width?: string;
    height?: string;
}

const Home: React.FC<HomeProps> = ({ color = '#814BFF', width = '28', height = '28' }) => {
    return (
        <svg
            width={width}
            height={height}
            viewBox="0 0 28 28"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                d="M24.5 23.3333C24.5 23.9777 23.9777 24.5 23.3333 24.5H4.66667C4.02234 24.5 3.5 23.9777 3.5 23.3333V11.0706C3.5 10.7106 3.66622 10.3707 3.9504 10.1497L13.2838 2.89041C13.7051 2.56274 14.2949 2.56274 14.7162 2.89041L24.0495 10.1497C24.3337 10.3707 24.5 10.7106 24.5 11.0706V23.3333Z"
                fill={color}
            />
        </svg>
    );
};

export default Home;
