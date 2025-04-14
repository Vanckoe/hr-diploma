'use client';

import React, { useState } from 'react';
import { GetVacancy } from '@/api/hr/types';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateVacancy } from '@/api/hr/queries';
import { toast } from 'sonner';
import Button from '@/components/ui/button';
import Input from '@/components/ui/input';
import RadioSelect from '@/components/ui/radioSelector';
import TagInput from '@/components/ui/tagInput';

interface EditVacancyModalProps {
    vacancy: GetVacancy;
    onClose: () => void;
}

const EditVacancyModal: React.FC<EditVacancyModalProps> = ({ vacancy, onClose }) => {
    const queryClient = useQueryClient();
    const workFormats = ['На месте работодателя', 'Удаленно', 'Гибрид', 'Разъездной'];
    const exp = ['Нет опыта', 'От 1 года до 3-х лет', 'От 3 до 6 лет', 'От 6 лет'];

    const [formData, setFormData] = useState({
        job_title: vacancy.job_title,
        specialization: vacancy.specialization,
        city: vacancy.city,
        hiring_plan: vacancy.hiring_plan,
        work_format: vacancy.work_format,
        salary_min: vacancy.salary_min,
        salary_max: vacancy.salary_max,
        experience: vacancy.experience,
        required_skills: Object.keys(vacancy.required_skills),
        job_description: vacancy.job_description,
        responsibilities: vacancy.responsibilities.text,
        requirements: vacancy.requirements.text,
        conditions: vacancy.conditions.text,
    });

    const { mutate: editVacancy, isPending } = useMutation({
        mutationFn: (data: Partial<GetVacancy>) => updateVacancy(vacancy.id, data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['archivedVacancies'] });
            toast.success('Вакансия успешно обновлена');
            onClose();
        },
        onError: () => {
            toast.error('Ошибка при обновлении вакансии');
        },
    });

    const handleSubmit = () => {
        editVacancy({
            ...formData,
            required_skills: formData.required_skills.reduce((acc, skill) => {
                acc[skill] = true;
                return acc;
            }, {} as Record<string, boolean>),
            responsibilities: { text: formData.responsibilities },
            requirements: { text: formData.requirements },
            conditions: { text: formData.conditions },
        });
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="max-h-[90vh] w-3/4 overflow-y-auto rounded-[10px] bg-white p-10">
                <div className="flex items-center justify-between">
                    <h2 className="text-2xl font-semibold">Редактировать вакансию</h2>
                    <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
                        ✕
                    </button>
                </div>

                <div className="mt-6 flex flex-col gap-4">
                    <InputField label="Название должности" value={formData.job_title} onChange={(val) => setFormData((prev) => ({ ...prev, job_title: val }))} />
                    <InputField label="Специализация" value={formData.specialization} onChange={(val) => setFormData((prev) => ({ ...prev, specialization: val }))} />
                    <InputField label="Город" value={formData.city} onChange={(val) => setFormData((prev) => ({ ...prev, city: val }))} />

                    <InputField
                        label="План найма"
                        value={formData.hiring_plan.toString()}
                        onChange={(val) => setFormData((prev) => ({ ...prev, hiring_plan: parseInt(val) || 0 }))}
                    />

                    <div>
                        <p className="mb-2 font-semibold">Формат работы</p>
                        <RadioSelect
                            options={workFormats}
                            value={formData.work_format}
                            onChange={(value) => setFormData((prev) => ({ ...prev, work_format: value }))}
                        />
                    </div>

                    <div className="flex gap-4">
                        <InputField
                            label="Минимальная зарплата"
                            value={formData.salary_min.toString()}
                            onChange={(val) => setFormData((prev) => ({ ...prev, salary_min: parseInt(val) || 0 }))}
                        />
                        <InputField
                            label="Максимальная зарплата"
                            value={formData.salary_max.toString()}
                            onChange={(val) => setFormData((prev) => ({ ...prev, salary_max: parseInt(val) || 0 }))}
                        />
                    </div>

                    <div>
                        <p className="mb-2 font-semibold">Опыт работы</p>
                        <RadioSelect
                            options={exp}
                            value={formData.experience}
                            onChange={(value) => setFormData((prev) => ({ ...prev, experience: value }))}
                        />
                    </div>

                    <div>
                        <p className="mb-2 font-semibold">Требуемые навыки</p>
                        <TagInput
                            value={formData.required_skills}
                            onChange={(tags) => setFormData((prev) => ({ ...prev, required_skills: tags }))}
                        />
                    </div>

                    <TextAreaField label="Описание вакансии" value={formData.job_description} onChange={(val) => setFormData((prev) => ({ ...prev, job_description: val }))} />
                    <TextAreaField label="Обязанности" value={formData.responsibilities} onChange={(val) => setFormData((prev) => ({ ...prev, responsibilities: val }))} />
                    <TextAreaField label="Требования" value={formData.requirements} onChange={(val) => setFormData((prev) => ({ ...prev, requirements: val }))} />
                    <TextAreaField label="Условия" value={formData.conditions} onChange={(val) => setFormData((prev) => ({ ...prev, conditions: val }))} />

                    <div className="mt-6 flex justify-end gap-4">
                        <Button onClick={onClose} variant="secondary">
                            Отмена
                        </Button>
                        <Button onClick={handleSubmit} disabled={isPending}>
                            {isPending ? 'Сохранение...' : 'Сохранить'}
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
};

const InputField = ({
    label,
    value,
    onChange,
}: {
    label: string;
    value: string;
    onChange: (val: string) => void;
}) => (
    <div>
        <p className="mb-2 font-semibold">{label}</p>
        <Input
            type="text"
            value={value}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => onChange(e.target.value)}
        />
    </div>
);

const TextAreaField = ({
    label,
    value,
    onChange,
}: {
    label: string;
    value: string;
    onChange: (val: string) => void;
}) => (
    <div>
        <p className="mb-2 font-semibold">{label}</p>
        <textarea
            className="min-h-[100px] w-full rounded-[10px] border border-gray-300 p-3"
            value={value}
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => onChange(e.target.value)}
        />
    </div>
);

export default EditVacancyModal;
