import COVER_IMAGE from "./../../assets/login_cover_image.png";
import ICON_IMAGE from "./../../assets/login_icon_image.png";
import LOGIN_GOOGLE_ICON from "./../../assets/login_with_google_icon.png";

const LoginPage = () => {
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
          <form className="my-4 w-full">
            <div className="mb-4">
              <p className="mb-2 ml-3">Tên đăng nhập</p>
              <input
                type="text"
                placeholder="Địa chỉ email"
                className="h-12 w-full rounded-md bg-gray-200 p-2 focus:outline-gray-400"
              />
            </div>
            <div className="mb-4">
              <p className="mb-2 ml-3">Mật khẩu</p>
              <input
                type="password"
                placeholder="Mật khẩu"
                className="h-12 w-full rounded-lg bg-gray-200 p-2 focus:outline-gray-400"
              />
            </div>
            <a href="#">
              <p className="text-right text-blue-700">Quên mật khẩu?</p>
            </a>
            <button className="my-8 w-full rounded-md bg-green-500 p-3 font-bold text-white hover:bg-green-600">
              Đăng nhập
            </button>
          </form>
          <hr className="border-t-2"></hr>
          <button className="my-8 w-full rounded-md bg-black p-3 text-white hover:bg-gray-900">
            <img src={LOGIN_GOOGLE_ICON} className="mr-2 inline"></img>Or sign
            in with Google
          </button>
          <span>
            Bạn chưa có tài khoản?<a className="">Đăng ký</a>
          </span>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
