import { z } from 'zod';
import { Gender } from '../enum/enum';
import { UpdatePasswordEntity } from '../../domain/entity/auth.entity';

export const profileSchema = z.object({
  lastName: z.string().trim().min(1, { message: 'Không được để trống' }),
  firstName: z.string().trim().min(1, { message: 'Không được để trống' }),
  gender: z.nativeEnum(Gender),
});

export const updatePasswordSchema = z
  .object({
    oldPassword: z
      .string()
      .trim()
      .min(1, { message: 'Mật khẩu có ít nhất 6 ký tự' }),
    newPassword: z
      .string()
      .trim()
      .min(1, { message: 'Mật khẩu có ít nhất 6 ký tự' }),
    confirmPassword: z
      .string()
      .trim()
      .min(1, { message: 'Mật khẩu có ít nhất 6 ký tự' }),
  })
  .refine((arg) => arg.newPassword === arg.confirmPassword, {
    message: 'Mật khẩu không khớp',
    path: ['confirmPassword'],
  });
