'use client';
import React from 'react';
import { useRouter } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import Portfolio from '@/assets/icons/hr/Portfolio';
import Button from '@/components/ui/button';
import { getUserResume } from '@/api/client/queries';
import { getVacancies } from '@/api/hr/queries';
import type { GetVacancy } from '@/api/hr/types';

const YourVacancy = () => {
    const router = useRouter();
    const { data: resume, isLoading: resumeLoading } = useQuery({
        queryKey: ['resume'],
        queryFn: getUserResume,
    });

    const { data: vacancies, isLoading: vacanciesLoading } = useQuery<GetVacancy[]>({
        queryKey: ['vacancies'],
        queryFn: getVacancies,
    });

    const onCreateResume = () => {
        router.push('/client/new-vacancy');
    };

    if (resumeLoading || vacanciesLoading) {
        return null;
    }

    if (resume && vacancies?.length) {
        return (
            <div className="rounded-[10px] bg-white px-8 pb-5 pt-[30px]">
                <p className="text-xl font-bold">Рекомендованные вакансии</p>
                <div className="mt-4 grid grid-cols-3 gap-4 rounded-[10px] bg-[#F8F8F8] p-6">
                    {vacancies.map((vacancy) => (
                        <div
                            key={vacancy.id}
                            className="flex flex-col gap-2 rounded-lg bg-white p-4 shadow-sm"
                        >
                            <h3 className="text-lg font-semibold">{vacancy.job_title}</h3>
                            <p className="text-sm text-gray-600">{vacancy.specialization}</p>
                            <p className="text-sm font-medium text-[#814BFF]">
                                от {vacancy.salary_min}₸
                            </p>
                        </div>
                    ))}
                </div>
                <a href="#" className="mt-4 block text-center text-[#814BFF] hover:underline">
                    Больше интересных вакансий
                </a>
            </div>
        );
    }

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
