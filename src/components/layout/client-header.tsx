'use client';
import React from 'react';
import Logo from '@/assets/icons/Logo';
import Door from '@/assets/icons/Doors';
import Link from 'next/link';
import { removeTokens } from '@/lib/auth/tokens';

const HrHeader = () => {
    const handleLogout = () => {
        removeTokens();
    };
  
    return (
        <div className="mb-10 flex w-full flex-row items-center justify-between">
            <div className="flex w-full justify-start">
                <Logo color="#814BFF" />
            </div>
            <Link
                href="/start" 
                onClick={handleLogout}
                className="flex flex-row items-center gap-3 rounded-[60px] border border-[#9494944D] px-6 py-3 text-[#949494] hover:bg-[#814BFF30]"
            >
                <Door color="#949494" width='20'  height='25'/>
                Выйти
            </Link>
        </div>
    );
};

export default HrHeader;
