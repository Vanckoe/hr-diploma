import React from 'react';
import User from '@/assets/icons/hr/User';
import TablePaper from '@/assets/icons/hr/TablePaper';
import Mail from '@/assets/icons/hr/Mail';
import Home from '@/assets/icons/hr/home';
import Link from 'next/link';

const Sidebar = () => {
    return (
        <div className="hidden md:block">
            <div className="w-20"></div>
            <div className="group fixed z-50 flex h-screen w-20 flex-col bg-white shadow-sm transition-all duration-500 ease-in-out hover:w-64">
                {/* Logo */}
                {/* <Link
                    href="/main"
                    className="z-10 ml-[13px] mt-8 flex flex-row items-center justify-start gap-5"
                >
                    <Logo width="53" height="53" color="white" />
                </Link> */}
                {/* Menu */}

                <nav className="mt-10 flex flex-col items-center justify-center gap-2 pl-6">
                    <NavItem href="/hr" icon={<Home color="#814BFF" />} text="Главная" />
                    <NavItem href="#!" icon={<Mail color="#814BFF" />} text="Архив вакансий" />
                    <NavItem href="#!" icon={<TablePaper color="#814BFF" />} text="Вакансии" />
                    <NavItem href="#!" icon={<User color="#814BFF" />} text="Кандидаты" />
                </nav>
            </div>
        </div>
    );
};

const NavItem = ({ href, icon, text }: { href: string; icon: React.ReactNode; text: string }) => {
    return (
        <Link href={href} className="group relative flex w-full items-center py-4">
            <div className="flex w-[30px] items-center justify-center">{icon}</div>
            <span className="group absolute left-9 ml-4 -translate-x-4 whitespace-nowrap opacity-0 transition-all duration-500 ease-in-out group-hover:translate-x-0 group-hover:opacity-100">
                {text}
            </span>
        </Link>
    );
};

export default Sidebar;
