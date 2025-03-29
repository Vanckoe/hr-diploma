import { z } from 'zod';

// export const post = z.object({
//     id: z.string(),
//     title: z.string(),
//     content: z.string(),
// });

// export type Post = z.infer<typeof post>;

export const login = z.object({
    phone_number: z.string(),
    password: z.string(),
});

export type Login = z.infer<typeof login>;

export const registration = z.object({
    full_name: z.string(),
    phone_number: z.string(),
    password: z.string(),
    user_pic: z.string(),
});

export type Registration = z.infer<typeof registration>;

export const authResponse = z.object({
    refresh: z.string(),
    access: z.string(),
});

export type AuthResponse = z.infer<typeof authResponse>;
