import { z } from 'zod';

export const vacancy = z.object({
    job_title: z.string({
        required_error: 'Enter job title',
    }),
    specialization: z.string({
        required_error: 'Enter specialization',
    }),
    city: z.string({
        required_error: 'Enter city',
    }),
    hiring_plan: z.number({
        required_error: 'Enter hiring plan',
    }),
    work_format: z.string({
        required_error: 'Enter work format',
    }),
    salary_min: z.number({
        required_error: 'Enter minimum salary',
    }),
    salary_max: z.number({
        required_error: 'Enter maximum salary',
    }),
    experience: z.string({
        required_error: 'Enter required experience',
    }),
    required_skills: z.record(z.any()),
    job_description: z.string({
        required_error: 'Enter job description',
    }),
    responsibilities: z.record(z.any()),
    requirements: z.record(z.any()),
    conditions: z.record(z.any()),
});

export type Vacancy = z.infer<typeof vacancy>;

export type GetVacancy = {
    id: number;
    job_title: string;
    specialization: string;
    city: string;
    hiring_plan: number;
    work_format: string;
    salary_min: number;
    salary_max: number;
    experience: string;
    required_skills: Record<string, any>;
    job_description: string;
    responsibilities: Record<string, any>;
    requirements: Record<string, any>;
    conditions: Record<string, any>;
    company_name?: string;
};
