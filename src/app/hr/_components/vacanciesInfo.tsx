'use client';

import React from 'react';
import { getVacancies } from '@/api/hr/queries';
import { useQuery } from '@tanstack/react-query';
import { GetVacancy } from '@/api/hr/types';

const VacanciesInfo = () => {
    const { data: vacancies, isLoading } = useQuery<GetVacancy[]>({
        queryKey: ['vacancies'],
        queryFn: getVacancies,
    });

    return (
        <div className="flex flex-row items-stretch gap-2.5">
            <div className="flex w-full flex-row items-center justify-between rounded-[10px] bg-white px-10">
                <p className="text-[80px] font-bold text-[#814BFF]">
                    {isLoading ? '...' : vacancies?.length || 0}
                </p>
                <p className="text-end text-2xl font-semibold">
                    активных <br /> вакансий
                </p>
            </div>
        </div>
    );
};

export default VacanciesInfo;
