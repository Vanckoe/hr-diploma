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
                    <NavItem href="#!" icon={<Home color="#814BFF" />} text="Главная" />
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

// <NavItem href="/main/profile" icon={<div className="flex w-8 items-center justify-center"><User color="white" />   </div>} text="Мой профиль" />
// <NavItem href="/main" icon={<div className="flex w-8 items-center justify-center"><Home color="white" />   </div>} text="Главная" />
// <NavItem href="/main/quests" icon={<div className="flex w-8 items-center justify-center"><Quest color="white" />  </div>} text="Мои квесты" />
// <NavItem href="/main/my-courses" icon={<div className="flex w-8 items-center justify-center"><Subject color="white" /></div>} text="Предметы" />
// <NavItem href="/main/statistics" icon={<div className="flex w-8 items-center justify-center"><Stat color="white" />   </div>} text="Статистика" />
// <NavItem href="/main/ent" icon={<div className="flex w-8 items-center justify-center"><Ent />                  </div>} text="Пробное ЕНТ" />
// <NavItem href="/main/leaderboard" icon={<div className="flex w-8 items-center justify-center"><Leader color="white" /> </div>} text="Лидерборд" />

// <NavItem href="/main/profile" icon={<div className="flex w-8 items-center justify-center"><User color="white" />   </div>} text={t('my_profile')} />
// <NavItem href="/main" icon={<div className="flex w-8 items-center justify-center"><Home color="white" />   </div>} text={t('home')} />
// <NavItem href="/main/error" icon={<div className="flex w-8 items-center justify-center"><Quest color="white" />  </div>} text={t('my_quests')} />
// <NavItem href="/main/my-courses" icon={<div className="flex w-8 items-center justify-center"><Subject color="white" /></div>} text={t('subjects')} />
// <NavItem href="/main/error" icon={<div className="flex w-8 items-center justify-center"><Stat color="white" />   </div>} text={t('statistics')} />
// <NavItem href="/main/ent" icon={<div className="flex w-8 items-center justify-center"><Ent />                  </div>} text={t('trial_ent')} />
// <NavItem href="/main/leaderboard" icon={<div className="flex w-8 items-center justify-center"><Leader color="white" /> </div>} text={t('leaderboard')} />
