import React from 'react';
import Logo from '@/assets/icons/Logo';
import User from '@/assets/icons/hr/User';

const HrHeader = () => {
    return (
        <div className="mb-10 flex w-full flex-row items-center justify-between">
            <div className="flex w-full justify-start">
                <Logo color="#814BFF" />
            </div>
            <button className="flex flex-row items-center gap-1 rounded-[60px] border border-[#9494944D] px-11 py-4 text-[#949494] hover:bg-[#814BFF30]">
                <User color="#949494" />
                Александр
            </button>
        </div>
    );
};

export default HrHeader;
