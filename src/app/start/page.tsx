import React from 'react';
import LogoHr from '@/assets/icons/LogoHr.svg';
import Login from '@/assets/icons/login.svg';
import Link from 'next/link';

const Star = () => {
    return (
        <div className="mt-8 flex min-h-screen flex-col">
            <div className="flex flex-row items-center justify-between">
                <LogoHr color="#814BFF" />
                <Link
                    className="flex flex-row items-center gap-3 rounded-md border border-[#814BFF] px-6 py-4 text-[#814BFF]"
                    href={'#!'}
                >
                    <Login />
                    Войти
                </Link>
            </div>
            <div className="mt-16 flex flex-row items-center gap-2.5">
                <p className="text-xs font-bold">Автоматизация</p>
                <div className="h-0 w-4 border border-[#814BFF]"></div>
                <p className="text-xs font-bold">Снижение предвзятости</p>
                <div className="h-0 w-4 border border-[#814BFF]"></div>
                <p className="text-xs font-bold">Экономия времени</p>
            </div>
            <p className="mt-6 text-[64px] font-semibold leading-[76px]">
                Личный HR помощник <br /> с ИИ для эффективного <br /> подбора персонала
            </p>
            <div className="mt-10 flex flex-row items-center gap-5">
                <button className="rounded-md bg-[#814BFF] p-5 text-white">
                    Я ищу сотрудников
                </button>
                <button className="rounded-md border border-[#814BFF] bg-white p-5 text-[#814BFF]">
                    Я ищу сотрудников
                </button>
            </div>
        </div>
    );
};

export default Star;
