import { AxiosError } from 'axios';
import { ErrorResponseEntity } from '../../domain/entity/common.entity';
import { toast } from 'react-toastify';

const ErrorMessageCode = {
  1602: 'Tài khoản đăng nhập không hợp lệ',
  1801: 'Tên tài khoản đã tồn tại vui lòng chọn tên khác',
};
export const handleException = (e: any) => {
  e = e as Error;
  if (e instanceof AxiosError) {
    const error: ErrorResponseEntity = e.response?.data.error;
    const msg =
      ErrorMessageCode[error.subErrorCode as keyof typeof ErrorMessageCode];
    toast.error(msg ?? 'Hệ thống bận, vui lòng thử lại sau', { type: 'error' });
  } else {
    toast.error('Hệ thống lỗi, vui lòng liên hệ quản trị viên', {
      type: 'error',
    });
  }
};
