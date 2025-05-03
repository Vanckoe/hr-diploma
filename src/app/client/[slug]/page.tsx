'use client';

import React from 'react';
import { useParams } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { getVacanciesById, getVacancies } from '@/api/hr/queries';
import type { GetVacancy } from '@/api/hr/types';

const VacancyCard = () => {
    const { slug } = useParams();
    const id = parseInt(slug as string);

    const { data: vacancy, isLoading: vacancyLoading } = useQuery({
        queryKey: ['vacancy', id],
        queryFn: () => getVacanciesById(id),
    });

    const { data: vacancies, isLoading: vacanciesLoading } = useQuery<GetVacancy[]>({
        queryKey: ['vacancies'],
        queryFn: getVacancies,
    });

    if (vacancyLoading || vacanciesLoading) return <div>Загрузка...</div>;
    if (!vacancy) return <div>Вакансия не найдена</div>;

    return (
        <div className="flex flex-row items-start gap-5">
            <div className="flex w-3/4 flex-col gap-5">
                <div className="flex w-full flex-col gap-6 rounded-2xl bg-white p-6 shadow-md">
                    {/* Header */}
                    <div className="flex flex-col items-start gap-5">
                        <div>
                            <h2 className="text-2xl font-semibold"> {vacancy.job_title}</h2>
                            <p className="mt-2 text-lg font-medium text-[#111]">
                                {' '}
                                {vacancy.company_name}
                            </p>
                            <ul className="mt-4 space-y-1 text-sm lowercase text-gray-600">
                                <li>
                                    Вилка от {vacancy.salary_min}тг до {vacancy.salary_max}тг
                                </li>
                                <li>Формат работы {vacancy.work_format}</li>
                                <li>Опыт {vacancy.experience}</li>
                            </ul>
                        </div>
                        <div className="flex flex-row items-center gap-5">
                            <button className="rounded-full bg-[#7747FF] px-6 py-2 text-white transition hover:bg-[#6636ee]">
                                Откликнуться
                            </button>
                            {/* <button className="rounded-full border border-[#7747FF] px-6 py-2 text-sm text-[#7747FF] transition hover:bg-[#f7f5ff]">
                            Подходит вам на 100%
                        </button> */}
                        </div>
                    </div>
                </div>

                {/* Description */}
                <div className="flex w-full flex-col gap-6 rounded-2xl bg-white p-6 shadow-md">
                    <div className="flex flex-col gap-4 text-sm leading-relaxed text-gray-800">
                        <p className="text-2xl font-semibold"> О нас </p>
                        <p className="text-base font-normal">{vacancy.job_description}</p>
                        <p className="text-2xl font-semibold"> Обязонности </p>
                        <p className="text-base font-normal"> {vacancy.requirements.text}</p>
                        <p className="text-2xl font-semibold"> Требования</p>
                        <p className="text-base font-normal"> {vacancy.requirements.text}</p>
                    </div>

                    {/* Tags */}
                    <div className="mt-4 flex flex-wrap gap-3 rounded-[10px] border border-[#39393933] px-5 py-4">
                        {Object.keys(vacancy.required_skills).map((skill) => (
                            <span
                                key={skill}
                                className="rounded-[10px] bg-[#F9F9F9] px-4 py-2.5 text-base font-semibold text-[#814BFF]"
                            >
                                {skill}
                            </span>
                        ))}
                    </div>
                </div>
            </div>
            <div className="flex w-1/4 flex-col gap-5">
                {vacancies && vacancies.length > 0 && (
                    <>
                        <p className="text-2xl font-semibold">Другие рекомендованные вакансии</p>
                        {vacancies.slice(0, 3).map((vacancy) => (
                            <div
                                key={vacancy.id}
                                onClick={() => (window.location.href = `/client/${vacancy.id}`)}
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
                    </>
                )}
            </div>
        </div>
    );
};

export default VacancyCard;
