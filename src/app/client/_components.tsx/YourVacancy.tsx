'use client';
import React from 'react';
import { useRouter } from 'next/navigation';
import Portfolio from '@/assets/icons/hr/Portfolio';
import Button from '@/components/ui/button';

const YourVacancy = () => {
    const router = useRouter();
    const onCreateResume = () => {
        router.push('/client/new-vacancy');
    };

    return (
        <div className="rounded-[10px] bg-white px-8 pb-5 pt-[30px]">
            <p className="text-xl font-bold">Рекомендованные вакансии </p>
            <div className="mt-4 flex flex-col items-center justify-center gap-7 rounded-[10px] bg-[#F8F8F8] px-12 pb-[55px] pt-[70px]">
                <div className="flex size-[100px] items-center justify-center rounded-full border border-[#814BFF45] bg-white">
                    <Portfolio />
                </div>
                <p className="text-center text-[32px] font-bold leading-9">
                    Создайте резюме, для поиска <br /> идеальной для вас работы
                </p>
                <Button className="w-fit px-[50px]" onClick={onCreateResume}>
                    Создать резюме
                </Button>
            </div>
        </div>
    );
};

export default YourVacancy;
