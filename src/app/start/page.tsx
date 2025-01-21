import React from 'react';
import LogoHr from '@/assets/icons/LogoHr.svg';
import Login from '@/assets/icons/login.svg';
import Link from 'next/link';
import Image from 'next/image';

const Star = () => {
    return (
        <div className="mt-8 flex min-h-screen flex-col">
            <div className="absolute right-0 top-0">
                <Image
                    src="/start/startBg.png"
                    alt="Logo"
                    width={524}
                    height={800}
                    className="-z-10"
                />
            </div>
            <div className="z-10 flex w-3/6 flex-row items-center justify-between">
                <LogoHr color="#814BFF" />
                <Link
                    className="flex flex-row items-center gap-3 rounded-md border border-[#814BFF] px-6 py-4 text-[#814BFF]"
                    href={'#!'}
                >
                    <Login />
                    Войти
                </Link>
            </div>
            <div className="z-10 mt-16 flex w-3/6 flex-row items-center gap-2.5">
                <p className="text-xs font-bold">Автоматизация</p>
                <div className="h-0 w-4 border border-[#814BFF]"></div>
                <p className="text-xs font-bold">Снижение предвзятости</p>
                <div className="h-0 w-4 border border-[#814BFF]"></div>
                <p className="text-xs font-bold">Экономия времени</p>
            </div>
            <p className="z-10 mt-6 flex w-4/6 text-[64px] font-semibold leading-[76px]">
                Личный HR помощник с ИИ для эффективного подбора персонала
            </p>
            <div className="mt-10 flex flex-row items-center gap-5">
                <Link
                    href={'/start/getEmployee'}
                    className="rounded-md bg-[#814BFF] p-5 text-white"
                >
                    Я ищу сотрудников
                </Link>
                <Link
                    href={'/start/getJob'}
                    className="rounded-md border border-[#814BFF] bg-white p-5 text-[#814BFF]"
                >
                    Я ищу сотрудников
                </Link>
            </div>
        </div>
    );
};

export default Star;
