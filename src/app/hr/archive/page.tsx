'use client';
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { getVacancies } from '@/api/hr/queries';
import { GetVacancy } from '@/api/hr/types';

const ArchivePage = () => {
    const {
        data: archivedVacancies,
        isLoading,
        error,
    } = useQuery<GetVacancy[]>({
        queryKey: ['archivedVacancies'],
        queryFn: getVacancies,
    });

    if (isLoading) {
        return <div className="flex justify-center p-10">Загрузка...</div>;
    }

    if (error) {
        return (
            <div className="flex justify-center p-10 text-red-500">Ошибка при загрузке данных</div>
        );
    }

    if (!archivedVacancies || archivedVacancies.length === 0) {
        return <div className="flex justify-center p-10">Нет архивных вакансий</div>;
    }

    return (
        <div className="flex w-full flex-col rounded-[10px] bg-white p-10">
            <p className="mb-5 text-[32px] font-bold">Архив вакансии</p>

            <div className="flex flex-col gap-2">
                {archivedVacancies.map((vacancy) => (
                    <div
                        key={vacancy.job_title}
                        className="flex items-center justify-between rounded-lg bg-gray-50 p-4"
                    >
                        <div className="flex-1">
                            <h3 className="font-medium">{vacancy.job_title}</h3>
                        </div>
                        <div className="flex-1 text-center">
                            <span className="text-gray-600">{vacancy.city}</span>
                        </div>
                        <div className="flex-1 text-center">
                            <span className="text-gray-600">{`от ${vacancy.salary_min} до ${vacancy.salary_max}₸`}</span>
                        </div>
                        <div className="flex gap-4">
                            <button className="text-gray-600 hover:underline" onClick={() => {}}>
                                Редактировать
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ArchivePage;
