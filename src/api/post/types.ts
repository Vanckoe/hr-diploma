import { z } from 'zod';

// export const post = z.object({
//     id: z.string(),
//     title: z.string(),
//     content: z.string(),
// });

// export type Post = z.infer<typeof post>;

export const login = z.object({
    phone_number: z
        .string({
            required_error: 'Введите номер телефона',
        })
        .min(10, 'Номер телефона должен содержать не менее 10 цифр')
        .max(20, 'Номер телефона не может быть длиннее 20 символов'),
    password: z
        .string({
            required_error: 'Введите пароль',
        })
        .min(6, 'Пароль должен содержать не менее 6 символов')
        .max(128, 'Пароль не может быть длиннее 128 символов'),
});

export type Login = z.infer<typeof login>;

export const registration = z.object({
    full_name: z
        .string({
            required_error: 'Введите ваше имя',
            invalid_type_error: 'Имя должно быть строкой',
        })
        .min(1, 'Имя не может быть пустым')
        .max(255, 'Имя не может быть длиннее 255 символов'),
    phone_number: z
        .string({
            required_error: 'Введите номер телефона',
            invalid_type_error: 'Номер телефона должен быть строкой',
        })
        .min(1, 'Номер телефона не может быть пустым')
        .max(20, 'Номер телефона не может быть длиннее 20 символов'),
    password: z
        .string({
            required_error: 'Придумайте пароль',
            invalid_type_error: 'Пароль должен быть строкой',
        })
        .min(1, 'Пароль не может быть пустым')
        .max(128, 'Пароль не может быть длиннее 128 символов'),
    user_pic: z
        .string({
            invalid_type_error: 'URL изображения должен быть строкой',
        })
        .url('Некорректный формат URL')
        .max(200, 'URL изображения не может быть длиннее 200 символов')
        .nullable()
        .optional(),
});

export type Registration = z.infer<typeof registration>;

export const authResponse = z.object({
    refresh: z.string(),
    access: z.string(),
});

export type AuthResponse = z.infer<typeof authResponse>;

export const hrRegistration = z.object({
    full_name: z.string(),
    password: z.string(),
    phone_number: z.string(),
    company_name: z.string(),
    industry: z.string(),
    company_description: z.string(),
    logo_hr: z.string().optional(),
});

export type HrRegistrationin = z.infer<typeof hrRegistration>;
