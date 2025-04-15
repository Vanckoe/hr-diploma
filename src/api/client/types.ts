import { z } from 'zod';

export const userResume = z.object({
    pk: z.number({
        required_error: 'User ID is required',
    }),
    full_name: z
        .string({
            required_error: 'Full name is required',
        })
        .min(1, 'Full name cannot be empty')
        .max(255, 'Full name cannot be longer than 255 characters'),
    position: z
        .string({
            required_error: 'Position is required',
        })
        .min(1, 'Position cannot be empty')
        .max(255, 'Position cannot be longer than 255 characters'),
    specialization: z
        .string({
            required_error: 'Specialization is required',
        })
        .min(1, 'Specialization cannot be empty')
        .max(255, 'Specialization cannot be longer than 255 characters'),
    work_format: z
        .string({
            required_error: 'Work format is required',
        })
        .min(1, 'Work format cannot be empty')
        .max(100, 'Work format cannot be longer than 100 characters'),
    ready_for_business_trips: z
        .string({
            required_error: 'Business trips preference is required',
        })
        .min(1, 'Business trips preference cannot be empty')
        .max(100, 'Business trips preference cannot be longer than 100 characters'),
    expected_salary: z
        .number({
            required_error: 'Expected salary is required',
        })
        .min(-9223372036854776000, 'Salary is too low')
        .max(9223372036854776000, 'Salary is too high'),
    experience: z
        .string({
            required_error: 'Experience is required',
        })
        .min(1, 'Experience cannot be empty')
        .max(255, 'Experience cannot be longer than 255 characters'),
    photo: z
        .string()
        .url('Invalid photo URL format')
        .max(200, 'Photo URL cannot be longer than 200 characters')
        .nullable()
        .optional(),
    skills: z.array(z.string()),
    about: z.string().optional(),
    languages: z.array(z.string()),
    education: z.array(z.string()),
});

export type UserResume = z.infer<typeof userResume>;
