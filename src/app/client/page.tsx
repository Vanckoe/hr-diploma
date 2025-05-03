/* eslint-disable react-hooks/exhaustive-deps */
'use client';

import React, { useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import Input from '@/components/ui/input';
import Search from '@/assets/icons/hr/Search';
import YourVacancy from './_components.tsx/YourVacancy';
import { apiClient } from '@/lib/api';
import { GetVacancy } from '@/api/hr/types';
import { debounce } from 'lodash';

const ClientPage = () => {
    const router = useRouter();
    const [searchQuery, setSearchQuery] = useState('');

    const debouncedSetSearchQuery = useCallback(
        debounce((value: string) => setSearchQuery(value), 300),
        [],
    );

    const { data: searchResults, isLoading } = useQuery<GetVacancy[]>({
        queryKey: ['vacancySearch', searchQuery],
        queryFn: async () => {
            if (!searchQuery) return [];
            const response = await apiClient.request<GetVacancy[]>('companies/vacancies/', {
                method: 'GET',
                queryParams: {
                    job_title: searchQuery,
                    specialization: searchQuery,
                    company_name: searchQuery,
                },
            });
            return response.data;
        },
        enabled: !!searchQuery,
    });

    return (
        <div className="flex flex-col gap-4">
            <div className="flex w-full flex-col items-center justify-center gap-5 rounded-[20px] bg-[#814BFFE3] pb-[70px] pt-[50px]">
                <p className="text-[42px] font-semibold text-white">Найди работу мечты</p>
                <div className="md:w-1/2">
                    <Input
                        className="!rounded-[40px]"
                        iconLeft={<Search />}
                        label="Поиск вакансий или кандидата"
                        value={searchQuery}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                            debouncedSetSearchQuery(e.target.value)
                        }
                    />
                    {isLoading && <div className="mt-4 text-white">Загрузка...</div>}
                    {searchResults && searchResults.length > 0 && (
                        
                        <div className="mt-4 max-h-60 w-full overflow-y-auto rounded-lg bg-white p-4">
                            {searchResults.map((vacancy) => (
                                <div key={vacancy.id}
                                onClick={() => router.push(`/client/${vacancy.id}`)}
                                className="mb-2 p-2 hover:bg-gray-100">
                                    <h3 className="font-medium">{vacancy.job_title}</h3>
                                    <div className="flex justify-between">
                                        <p className="text-sm text-gray-600">
                                            {vacancy.specialization}
                                        </p>
                                        <p className="text-sm text-gray-600">
                                        • {vacancy.work_format} •
                                        </p>
                                    </div>
                                    <div className="mt-1 text-sm text-gray-500">
                                        {vacancy.city} {' '}
                                        {vacancy.salary_min.toLocaleString()}₸ -{' '}
                                        {vacancy.salary_max.toLocaleString()}₸
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
            <YourVacancy />
        </div>
    );
};

export default ClientPage;
