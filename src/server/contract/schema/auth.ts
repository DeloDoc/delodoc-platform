import { z } from 'zod';

import * as queries from '../../database/queries';

const emailField = z.string().min(1, { message: 'Required field' }).email('Invalid email format');

export const signinSchema = z.object({
    email: emailField,
    password: z.string().min(1, { message: 'Required field' }),
});

export type SigninSchema = z.infer<typeof signinSchema>;

export const signupSchema = z.object({
    theme: z.string(),
    email: emailField.refine(async (email) => {
        const exists = await queries.user.exists({ email });

        return !exists;
    }, 'User already exists'),
    password: z.string().min(6, { message: 'Password must be longer than 6 symbols' }),
});

export type SignupSchema = z.infer<typeof signupSchema>;

export const firstSignupSchema = signupSchema.extend({
    project: z.string().min(3, { message: 'Blog name must be longer than 3 symbols' }),
});

export type FirstSignupSchema = z.infer<typeof firstSignupSchema>;
