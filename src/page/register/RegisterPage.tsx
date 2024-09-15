import REGISTER_IMG from '../../assets/image/register_img.png';
import LOGO_ICON from '../../assets/logo_icon.png';
import { useNavigate } from 'react-router-dom';
import RegisterFormComponent from './components/RegisterFormComponent';
import { useGoogleOneTapLogin } from '@react-oauth/google';
import { RouterConstants } from '../../common/constant/route.constant';
import { handleException } from '../../common/ultils/exception.ulti';
import { toastNotification } from '../../common/ultils/notification.ulti';
import { validateGoogleAccount } from '../../domain/usecase/auth.usecase';
import { useAuthContext } from '../../context/auth.context';

function RegisterPage() {
  const { authDispatch } = useAuthContext();
  const navigate = useNavigate();
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
    <>
      <div className="flex h-[100vh] items-center justify-center">
        <div className="m-auto flex h-[80%] w-[80%] justify-center rounded-[24px] shadow-md">
          <img src={REGISTER_IMG} alt="" className="" />
          <div className="grow-[1] px-[100px]">
            <div className="mb-[32px] flex justify-end">
              <img src={LOGO_ICON} alt="" className="w-[8rem]" />
            </div>
            <RegisterFormComponent />
          </div>
        </div>
      </div>
    </>
  );
}

export default RegisterPage;
