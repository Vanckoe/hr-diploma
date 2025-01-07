import React from 'react';
import Input from '../ui/input';
import Search from '@/assets/icons/hr/Search';
import Link from 'next/link';
import Add from '@/assets/icons/hr/Add';
import Logo from '@/assets/icons/Logo';

const HrHeader = () => {
    return (
        <div className="mb-10 flex w-full flex-row items-center justify-between">
            <div className="flex w-full flex-row items-center gap-5">
                <Input
                    className="w-[400px] !rounded-[40px]"
                    iconLeft={<Search />}
                    label="Поиск вакансий или кандидата"
                />
                <Link
                    href={'/hr/vacancy'}
                    className="flex flex-row items-center gap-2 rounded-[40px] bg-[#814BFF] px-9 py-5 text-white"
                >
                    <Add />
                    Вакансия
                </Link>
            </div>
            <div className="flex w-full justify-end">
                <Logo color="#814BFF" />
            </div>
        </div>
    );
};

export default HrHeader;
