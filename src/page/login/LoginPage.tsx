import { useState } from 'react';
import COVER_IMAGE from './../../assets/login_cover_image.png';
import ICON_IMAGE from './../../assets/login_icon_image.png';
import LOGIN_GOOGLE_ICON from './../../assets/login_with_google_icon.png';
import { LoginEntity } from '../../domain/entity/auth.entity';
import {
  login,
  validateGoogleAccount,
} from '../../domain/usecase/auth.usecase';
import { useAuthContext } from '../../context/auth.context';
import { Link, useNavigate } from 'react-router-dom';
import { RouterConstants } from '../../common/constant/route.constant';
import { toastNotification } from '../../common/ultils/notification.ulti';
import { handleException } from '../../common/ultils/exception.ulti';
import { useGoogleLogin, useGoogleOneTapLogin } from '@react-oauth/google';

const LoginPage = () => {
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState<Partial<LoginEntity>>();
  const { authDispatch, userId } = useAuthContext();

  const loginWithGoogle = useGoogleLogin({
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
  useGoogleOneTapLogin({
    onSuccess: async (credentialResponse) => {
      try {
        const data = await validateGoogleAccount({
          idToken: credentialResponse.credential!,
        });
        authDispatch({ type: 'LOGIN_SUCCESS', payload: data.userId });
        navigate(RouterConstants.home.index);
        toastNotification({
          msg: 'Đăng nhập thành công',
        });
      } catch (e) {
        handleException(e);
      }
    },
    onError: () => {
      console.log('Login Failed');
    },
    auto_select: false,
    use_fedcm_for_prompt: true,
  });
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="relative flex flex-col w-3/4 h-full">
        <img src={COVER_IMAGE} className="w-full h-full" />
      </div>
      <div className="w-1/4 h-full p-10">
        <div
          className="my-6 cursor-pointer"
          onClick={() => navigate(RouterConstants.home.index)}
        >
          <img src={ICON_IMAGE} className="inline mr-2"></img>
          <p className="inline font-bold">UI Unicorn</p>
        </div>
        <div>
          <p className="text-[24px] font-bold">Rất vui được gặp bạn</p>
          <div className="w-full my-4">
            <div className="mb-4">
              <p className="mb-2 ml-3">Địa chỉ email</p>
              <input
                type="text"
                placeholder="Địa chỉ email"
                className="w-full h-12 p-2 bg-gray-200 rounded-md focus:outline-gray-400"
                value={credentials?.email}
                onChange={(e) =>
                  setCredentials((prev) => {
                    return { ...prev, email: e.target.value };
                  })
                }
              />
            </div>
            <div className="mb-4">
              <p className="mb-2 ml-3">Mật khẩu</p>
              <input
                type="password"
                placeholder="Mật khẩu"
                className="w-full h-12 p-2 bg-gray-200 rounded-lg focus:outline-gray-400"
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
              className="w-full p-3 my-8 font-bold text-white rounded-md bg-primary-2 hover:bg-green-600"
              onClick={handleLogin}
            >
              Đăng nhập
            </button>
          </div>
          <hr className="border-t-2"></hr>
          <button
            className="w-full p-3 my-8 text-white bg-black rounded-md hover:bg-gray-900"
            onClick={() => loginWithGoogle()}
          >
            <img src={LOGIN_GOOGLE_ICON} className="inline mr-2"></img>Or sign
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
