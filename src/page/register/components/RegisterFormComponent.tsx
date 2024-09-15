import { Link, useNavigate } from 'react-router-dom';
import AppInputText from '../../../common/components/AppInputText';
import { RouterConstants } from '../../../common/constant/route.constant';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { RegisterUserFormEntity } from '../../../domain/entity/user.entity';
import { registerSchema } from '../../../common/zod/register.zod';
import { handleException } from '../../../common/ultils/exception.ulti';
import { toastNotification } from '../../../common/ultils/notification.ulti';
import {
  registerUserAccount,
  validateGoogleAccount,
} from '../../../domain/usecase/auth.usecase';
import LOGIN_GOOGLE_ICON from '@src/assets/login_with_google_icon.png';
import { useGoogleLogin } from '@react-oauth/google';
import { useAuthContext } from '../../../context/auth.context';

function RegisterFormComponent() {
  const navigate = useNavigate();
  const form = useForm<RegisterUserFormEntity>({
    defaultValues: {
      email: '',
      firstName: '',
      lastName: '',
      password: '',
      confirmPassword: '',
    },
    resolver: zodResolver(registerSchema),
    mode: 'onTouched',
  });
  const { authDispatch } = useAuthContext();
  const { register, handleSubmit, formState, getValues } = form;
  const { errors } = formState;
  const handleLoginWithGoogle = useGoogleLogin({
    onSuccess: async (codeResponse) => {
      try {
        const data = await validateGoogleAccount({ code: codeResponse.code });
        authDispatch({ type: 'LOGIN_SUCCESS', payload: data.userId });
        navigate(RouterConstants.home.index);
        toastNotification({
          msg: 'Đăng nhập thành công',
        });
      } catch (e) {
        handleException(e);
      }
    },
    flow: 'auth-code',
  });
  async function handleOnSubmit(data: RegisterUserFormEntity) {
    try {
      await registerUserAccount(data);
      toastNotification({ msg: 'Đăng ký tài khoản thành công' });
      navigate(RouterConstants.login.index);
    } catch (error) {
      handleException(error);
    }
  }
  return (
    <form onSubmit={handleSubmit(handleOnSubmit)}>
      <div>
        <h1 className="mb-[16px] text-[2rem] font-[700]">Đăng ký tài khoản</h1>
        <p className="mb-[20px] text-[1.2rem] text-gray-1">
          Hãy điền tất cả thông tin đăng ký vào bên dưới
        </p>
        <div className="flex gap-3">
          <AppInputText
            register={register('lastName')}
            placeHolder="Họ"
            errorText={errors.lastName?.message}
            value={getValues('lastName')}
          />
          <AppInputText
            register={register('firstName')}
            placeHolder="Tên"
            errorText={errors.firstName?.message}
            value={getValues('firstName')}
          />
        </div>
        <AppInputText
          register={register('email')}
          placeHolder="Email"
          errorText={errors.email?.message}
          value={getValues('email')}
        />
        <AppInputText
          type="password"
          register={register('password')}
          placeHolder="Mật khẩu"
          errorText={errors.password?.message}
          value={getValues('password')}
        />
        <AppInputText
          type="password"
          register={register('confirmPassword')}
          placeHolder="Xác nhận mật khẩu"
          errorText={errors.confirmPassword?.message}
          value={getValues('confirmPassword')}
        />
        <button
          className="mb-[20px] mt-[40px] h-[40px] w-full rounded-sm bg-primary-2 font-[600] uppercase text-white"
          type="submit"
        >
          Tạo tài khoản
        </button>
        <p className="w-full text-center">
          Bạn đã có tài khoản?{' '}
          <Link to={RouterConstants.login.index} className="text-blue-500">
            Hãy đăng nhập
          </Link>
        </p>
      </div>
      <div className="my-[30px] flex items-center">
        <div className="grow-[1] border-t-[1px]"></div>
        <p className="mx-3">Or sign up with</p>
        <div className="grow-[1] border-t-[1px]"></div>
      </div>
      <button
        className="w-full p-3 my-8 text-white bg-black rounded-md hover:bg-gray-900"
        onClick={handleLoginWithGoogle}
      >
        <img src={LOGIN_GOOGLE_ICON} className="inline mr-2"></img> Google
      </button>
    </form>
  );
}

export default RegisterFormComponent;
