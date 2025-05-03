import { z } from 'zod';

export const stepOneSchema = z.object({
    // company: z.string().min(1, 'Введите название компании'),
    // vacancy_number: z.number().min(1, 'Введите номер вакансии'),
    job_title: z.string().min(1, 'Введите название должности'),
    specialization: z.string().min(1, 'Введите специализацию'),
    city: z.string().min(1, 'Введите город'),
    hiring_plan: z.number().min(1, 'Введите количество сотрудников'),
    work_format: z.enum(['На месте работодателя', 'Удаленно', 'Гибрид', 'Разъездной'], {
        required_error: 'Выберите формат работы',
    }),
    salary_min: z.number().min(0, 'Минимальная зарплата должна быть больше 0'),
    salary_max: z.number().min(0, 'Максимальная зарплата должна быть больше 0'),
    experience: z.enum(['Нет опыта', 'От 1 года до 3-х лет', 'От 3 до 6 лет', 'От 6 лет'], {
        required_error: 'Выберите требуемый опыт',
    }),
    required_skills: z.array(z.string()).min(1, 'Добавьте хотя бы один навык'),
});

export const stepTwoSchema = z.object({
    job_description: z.string().min(1, 'Описание должно содержать не менее 1 символов'),
    responsibilities: z.string().min(1, 'Введите обязанности'),
    requirements: z.string().min(1, 'Введите требования'),
    conditions: z.string().min(1, 'Введите условия'),
});

export type StepOneData = z.infer<typeof stepOneSchema>;
export type StepTwoData = z.infer<typeof stepTwoSchema>;
