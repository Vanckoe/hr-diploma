import React from 'react';
import Logo from '@/assets/icons/LogoHr.svg';

const Footer = () => {
    return (
        <div className="mb-5 mt-auto flex w-full flex-row items-center justify-between rounded-lg bg-black p-[18px]">
            <Logo color="#ffffff" />
            <p className="text-base font-medium text-white">© Все права защищены</p>
        </div>
    );
};

export default Footer;
