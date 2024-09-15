import { z } from 'zod';
export const registerSchema = z
  .object({
    email: z.string().trim().min(6, { message: 'Nhập ít nhất 6 ký tự' }),
    lastName: z.string().trim().min(1, { message: 'Không được để trống' }),
    firstName: z.string().trim().min(1, { message: 'Không được để trống' }),
    password: z.string().trim().min(6, { message: 'Nhập ít nhất 6 ký tự' }),
    confirmPassword: z
      .string()
      .trim()
      .min(6, { message: 'Nhập ít nhất 6 ký tự' }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Mật khẩu không khớp',
    path: ['confirmPassword'],
  });
