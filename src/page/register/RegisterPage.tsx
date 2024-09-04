import REGISTER_IMG from '../../assets/image/register_img.png';
import LOGO_ICON from '../../assets/logo_icon.png';
import RegisterInputText from './components/RegisterInputText';
import { RegisterUserFormEntity } from '../../domain/entity/user.entity';
import { Link, useNavigate } from 'react-router-dom';
import { RouterConstants } from '../../common/constant/route.constant';
import LOGIN_GOOGLE_ICON from './../../assets/login_with_google_icon.png';
import { registerUserAccount } from '../../domain/usecase/auth.usecase';
import { FieldErrors, useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { DevTool } from '@hookform/devtools';
import { toastNotification } from '../../common/ultils/notification.ulti';
import { handleException } from '../../common/ultils/exception.ulti';
const schema = z
  .object({
    username: z.string().trim().min(6, { message: 'Nhập ít nhất 6 ký tự' }),
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
function RegisterPage() {
  const navigate = useNavigate();
  const form = useForm<RegisterUserFormEntity>({
    defaultValues: {
      username: '',
      firstName: '',
      lastName: '',
      password: '',
      confirmPassword: '',
    },
    resolver: zodResolver(schema),
    mode: 'onTouched',
  });
  const { register, handleSubmit, control, formState, getValues } = form;
  const { errors } = formState;

  return (
    <>
      <div className="flex h-[100vh] items-center justify-center">
        <form
          className="m-auto flex h-[80%] w-[80%] justify-center rounded-[24px] shadow-md"
          onSubmit={handleSubmit(handleOnSubmit)}
        >
          <img src={REGISTER_IMG} alt="" className="" />
          <div className="grow-[1] px-[100px]">
            <div className="mb-[32px] flex justify-end">
              <img src={LOGO_ICON} alt="" className="" />
            </div>
            <div>
              <h1 className="mb-[16px] text-[2rem] font-[700]">
                Đăng ký tài khoản
              </h1>
              <p className="mb-[20px] text-[1.2rem] text-gray-1">
                Hãy điền tất cả thông tin đăng ký vào bên dưới
              </p>
              <div className="flex gap-3">
                <RegisterInputText
                  register={register('lastName')}
                  placeHolder="Họ"
                  errorText={errors.lastName?.message}
                  value={getValues('lastName')}
                />
                <RegisterInputText
                  register={register('firstName')}
                  placeHolder="Tên"
                  errorText={errors.firstName?.message}
                  value={getValues('firstName')}
                />
              </div>
              <RegisterInputText
                register={register('username')}
                placeHolder="Tên tài khoản"
                errorText={errors.username?.message}
                value={getValues('username')}
              />
              <RegisterInputText
                type="password"
                register={register('password')}
                placeHolder="Mật khẩu"
                errorText={errors.password?.message}
                value={getValues('password')}
              />
              <RegisterInputText
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
                <Link
                  to={RouterConstants.login.index}
                  className="text-blue-500"
                >
                  Hãy đăng nhập
                </Link>
              </p>
            </div>
            <div className="my-[30px] flex items-center">
              <div className="grow-[1] border-t-[1px]"></div>
              <p className="mx-3">Or sign up with</p>
              <div className="grow-[1] border-t-[1px]"></div>
            </div>
            <button className="my-8 w-full rounded-md bg-black p-3 text-white hover:bg-gray-900">
              <img src={LOGIN_GOOGLE_ICON} className="mr-2 inline"></img> Google
            </button>
          </div>
        </form>
      </div>
    </>
  );

  async function handleOnSubmit(data: RegisterUserFormEntity) {
    try {
      await registerUserAccount(data);
      toastNotification({ msg: 'Đăng ký tài khoản thành công' });
      navigate(RouterConstants.login.index);
    } catch (error) {
      handleException(error);
    }
  }
}

export default RegisterPage;
