import type { Config } from 'tailwindcss';

const config: Config = {
    content: [
        './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
        './src/components/**/*.{js,ts,jsx,tsx,mdx}',
        './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
        container: {
            center: true,
            padding: '2rem',
            screens: {
                sm: '620px',
                md: '730px',
                lg: '1000px',
                xl: '1280px',
                '2xl': '1500px',
            },
        },
        extend: {
            letterSpacing: {
                'negative-3': '-0.03em', // Значение для межбуквенного расстояния -3%
            },
            colors: {
                background: 'var(--background)',
                foreground: 'var(--foreground)',
            },
            backgroundImage: {
                'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
                'gradient-conic':
                    'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
            },
            keyframes: {
                pulsate: {
                    '0%': { transform: 'scale(0.1)', opacity: '0' },
                    '50%': { transform: 'scale(1)', opacity: '0.5' },
                    '100%': { transform: 'scale(1.5)', opacity: '0' },
                },
                slideDown: {
                    from: { height: '0px' },
                    to: { height: 'var(--radix-accordion-content-height)' },
                },
                slideUp: {
                    from: { height: 'var(--radix-accordion-content-height)' },
                    to: { height: '0px' },
                },
            },
            animation: {
                pulsate: 'pulsate 1s ease-out infinite',
                slideDown: 'slideDown 300ms cubic-bezier(0.87, 0, 0.13, 1)',
                slideUp: 'slideUp 300ms cubic-bezier(0.87, 0, 0.13, 1)',
            },
        },
    },
    plugins: [],
};

export default config;
