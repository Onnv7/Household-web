import OLD_PASSWORD_ICON from '@src/assets/icon/lock_fullfil_icon.png';
import NEW_PASSWORD_ICON from '@src/assets/icon/password_icon.png';
import AppInputText2 from '../../../common/components/AppInputText2';
import { useForm } from 'react-hook-form';
import { UpdatePasswordEntity } from '../../../domain/entity/auth.entity';
import { zodResolver } from '@hookform/resolvers/zod';
import { updatePasswordSchema } from '../../../common/zod/account.zod';
import { DevTool } from '@hookform/devtools';
import { useAuthContext } from '../../../context/auth.context';
import { updatePassword } from '../../../domain/usecase/auth.usecase';
import { handleException } from '../../../common/ultils/exception.ulti';
import { toastNotification } from '../../../common/ultils/notification.ulti';

function UpdatePasswordComponent() {
  const { userId } = useAuthContext();
  const form = useForm<UpdatePasswordEntity>({
    defaultValues: {
      oldPassword: '',
      newPassword: '',
      confirmPassword: '',
    },
    resolver: zodResolver(updatePasswordSchema),
    mode: 'onSubmit',
  });
  const { register, handleSubmit, formState, reset, control } = form;
  const { errors } = formState;
  async function handleOnSubmit(formData: UpdatePasswordEntity) {
    try {
      await updatePassword(userId!, formData);
      toastNotification({ msg: 'Thay đổi mật khẩu thành công' });
      reset();
    } catch (error) {
      handleException(error);
    }
  }
  return (
    <div className="p-2">
      <h1 className="text-[1.8rem] font-[500]">Đổi mật khẩu</h1>
      <form action="" onSubmit={handleSubmit(handleOnSubmit)}>
        <div className="w-full">
          <p>Mật khẩu cũ</p>
          <AppInputText2
            type="password"
            placeHolder="Mật khẩu cũ"
            register={register('oldPassword')}
            errorText={errors.oldPassword?.message}
            icon_path={OLD_PASSWORD_ICON}
          />
        </div>
        <div className="w-full">
          <p>Mật khẩu mới</p>
          <AppInputText2
            type="password"
            placeHolder="Mật khẩu mới"
            register={register('newPassword')}
            errorText={errors.newPassword?.message}
            icon_path={NEW_PASSWORD_ICON}
          />
        </div>
        <div className="w-full">
          <p>Xác nhận mật khẩu</p>
          <AppInputText2
            type="password"
            placeHolder="Xác nhận mật khẩu"
            register={register('confirmPassword')}
            errorText={errors.confirmPassword?.message}
            icon_path={NEW_PASSWORD_ICON}
          />
        </div>
        <button
          className="my-4 w-full rounded-md bg-primary-2 py-2 text-[1.2rem] font-[500] text-white"
          type="submit"
        >
          Cập nhật mật khẩu
        </button>
      </form>
      <DevTool control={control} />
    </div>
  );
}

export default UpdatePasswordComponent;
