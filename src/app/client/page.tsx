import React from 'react';
import Input from '@/components/ui/input';
import Search from '@/assets/icons/hr/Search';
import YourVacancy from './_components.tsx/YourVacancy';

const ClientPage = () => {
    return (
        <div className="flex flex-col gap-4">
            <div className="flex w-full flex-col items-center justify-center gap-5 rounded-[20px] bg-[#814BFFE3] pb-[70px] pt-[50px]">
                <p className="text-[42px] font-semibold text-white">Найди работу мечты</p>
                <div className="md:w-1/2">
                    <Input
                        className="!rounded-[40px]"
                        iconLeft={<Search />}
                        label="Поиск вакансий или кандидата"
                    />
                </div>
            </div>
            <YourVacancy />
        </div>
    );
};

export default ClientPage;
