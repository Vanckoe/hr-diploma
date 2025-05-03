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
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
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

    return (
        <div className="flex flex-col gap-5">
            {vacancies && vacancies.length > 0 ? (
                <div className="rounded-[10px] bg-white px-8 pb-5 pt-[30px]">
                    <p className="text-xl font-bold">Рекомендованные вакансии </p>

                    <div className="mt-4 grid grid-cols-3 gap-4 rounded-[10px] bg-[#F8F8F8] p-6">
                        {vacancies.map((vacancy) => (
                            <div
                                key={vacancy.id}
                                onClick={() => router.push(`/client/vacancy/${vacancy.id}`)}
                                className="flex cursor-pointer flex-col gap-2 rounded-lg bg-white p-4 shadow-sm transition hover:shadow-md"
                            >
                                <h3 className="text-lg font-semibold">{vacancy.job_title}</h3>
                                <p className="text-sm text-gray-600">{vacancy.specialization}</p>
                                <p className="text-sm text-gray-500">{vacancy.city}</p>
                                <p className="text-sm text-gray-500">{vacancy.experience}</p>
                                <p className="text-sm font-medium text-[#814BFF]">
                                    {vacancy.salary_min
                                        ? `от ${vacancy.salary_min.toLocaleString()}₸` +
                                          (vacancy.salary_max
                                              ? ` до ${vacancy.salary_max.toLocaleString()}₸`
                                              : '')
                                        : 'Зарплата не указана'}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            ) : (
                <p className="mt-4 text-sm text-gray-500">Вакансий пока нет.</p>
            )}

            <div className="rounded-[10px] bg-white px-8 pb-5 pt-[30px]">
                <p className="text-xl font-bold">Добавьте свое резюме </p>
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
        </div>
    );
};

export default YourVacancy;
