import { z } from 'zod';
import { isTenDigitNumber } from '../ultils/check.ultil';
import { OrderType } from '../enum/enum';

export const deliverySchema = z
  .object({
    name: z.string().trim().min(1, { message: 'Không được để trống' }),
    phoneNumber: z
      .string()
      .refine(isTenDigitNumber, { message: 'Số điện thoại phải có 10 chữ số' }),
    orderType: z.nativeEnum(OrderType),
    note: z.string().optional(),
    province: z.string().optional(),
    district: z.string().optional(),
    ward: z.string().optional(),
    details: z.string().optional(),
  })
  .superRefine((data, ctx) => {
    if (data.orderType !== OrderType.TAKE_AWAY) {
      if (!data.province) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ['province'],
          message: 'Vui lòng chọn tỉnh/thành phố',
        });
      }
      if (!data.district) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ['district'],
          message: 'Vui lòng chọn quận/huyện',
        });
      }
      if (!data.ward) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ['ward'],
          message: 'Vui lòng chọn phường/xã',
        });
      }
      if (!data.details) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ['details'],
          message: 'Vui lòng nhập địa chỉ giao hàng',
        });
      }
    }
  });
