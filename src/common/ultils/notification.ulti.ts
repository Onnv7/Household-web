import { toast } from 'react-toastify';
import { ErrorResponseEntity } from '../../domain/entity/common.entity';
type ToastNotificationType = {
  msg: string;
  type?: 'info' | 'success' | 'warning' | 'error';
  position?:
    | 'top-right'
    | 'top-center'
    | 'top-left'
    | 'bottom-right'
    | 'bottom-center'
    | 'bottom-left';
};
export const toastNotification = ({
  msg,
  type = 'success',
  position = 'top-right',
}: ToastNotificationType) => {
  toast(msg, {
    type,
    position,
  });
};
