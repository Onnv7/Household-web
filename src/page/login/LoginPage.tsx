import { useState } from 'react';
import COVER_IMAGE from './../../assets/login_cover_image.png';
import ICON_IMAGE from './../../assets/login_icon_image.png';
import LOGIN_GOOGLE_ICON from './../../assets/login_with_google_icon.png';
import { LoginEntity } from '../../domain/entity/login.entity';
import { login } from '../../domain/usecase/auth.usecase';
import { useAuthContext } from '../../context/auth.context';
import { Link, useNavigate } from 'react-router-dom';
import { RouterConstants } from '../../common/constant/route.constant';
import { AxiosError } from 'axios';
import { ErrorResponseEntity } from '../../domain/entity/common.entity';
import { toastNotification } from '../../common/ultils/notification.ulti';
import { handleException } from '../../common/ultils/exception.ulti';

const LoginPage = () => {
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState<Partial<LoginEntity>>();
  const { authDispatch, userId } = useAuthContext();
  return (
    <div className="flex h-screen items-center justify-center">
      <div className="relative flex h-full w-3/4 flex-col">
        <img src={COVER_IMAGE} className="h-full w-full" />
      </div>
      <div className="h-full w-1/4 p-10">
        <div className="my-6">
          <img src={ICON_IMAGE} className="mr-2 inline"></img>
          <p className="inline font-bold">UI Unicorn</p>
        </div>
        <div>
          <p className="text-[24px] font-bold">Rất vui được gặp bạn</p>
          <div className="my-4 w-full">
            <div className="mb-4">
              <p className="mb-2 ml-3">Tên đăng nhập</p>
              <input
                type="text"
                placeholder="Địa chỉ email"
                className="h-12 w-full rounded-md bg-gray-200 p-2 focus:outline-gray-400"
                value={credentials?.username}
                onChange={(e) =>
                  setCredentials((prev) => {
                    return { ...prev, username: e.target.value };
                  })
                }
              />
            </div>
            <div className="mb-4">
              <p className="mb-2 ml-3">Mật khẩu</p>
              <input
                type="password"
                placeholder="Mật khẩu"
                className="h-12 w-full rounded-lg bg-gray-200 p-2 focus:outline-gray-400"
                value={credentials?.password}
                onChange={(e) =>
                  setCredentials((prev) => {
                    return { ...prev, password: e.target.value };
                  })
                }
              />
            </div>
            <a href="#">
              <p className="text-right text-blue-700">Quên mật khẩu?</p>
            </a>
            <button
              className="my-8 w-full rounded-md bg-primary-2 p-3 font-bold text-white hover:bg-green-600"
              onClick={handleLogin}
            >
              Đăng nhập
            </button>
          </div>
          <hr className="border-t-2"></hr>
          <button className="my-8 w-full rounded-md bg-black p-3 text-white hover:bg-gray-900">
            <img src={LOGIN_GOOGLE_ICON} className="mr-2 inline"></img>Or sign
            in with Google
          </button>
          <span>
            Bạn chưa có tài khoản?
            <Link className="text-blue-500" to={RouterConstants.register.index}>
              Đăng ký
            </Link>
          </span>
        </div>
      </div>
    </div>
  );

  async function handleLogin() {
    try {
      const data = await login(credentials as LoginEntity);
      authDispatch({ type: 'LOGIN_SUCCESS', payload: data.userId });
      navigate(RouterConstants.home.index);
      toastNotification({
        msg: 'Đăng nhập thành công',
      });
    } catch (err) {
      handleException(err);
    }
  }
};

export default LoginPage;
