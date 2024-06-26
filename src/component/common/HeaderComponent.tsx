import { useState } from "react";
import LOGO_APP_ICON from "../../assets/logo_icon.png";
import SEARCH_ICON from "../../assets/search_icon.png";
import CART_ICON from "../../assets/cart_icon.png";
import ACCOUNT_ICON from "../../assets/account_icon.png";
const HeaderComponent = () => {
  const [isVisible, setIsVisible] = useState(false);
  const toggleDropdown = () => {
    setIsVisible(!isVisible);
  };
  return (
    <>
      <div className="flex h-[50px] w-[100vw] items-center justify-between">
        <img
          src={LOGO_APP_ICON}
          className="h-full grow-[1] object-scale-down"
        />
        <div className="flex grow-[5] rounded-md border-2 border-green-200 p-2">
          <div className="">
            <div className="cursor-pointer px-3" onClick={toggleDropdown}>
              <div className="select-none">Đồ điện tử</div>
              <div className="border-l-2 border-solid border-l-transparent"></div>
            </div>
            {isVisible && (
              <ul className="absolute z-10 mt-3 rounded-md bg-green-50 p-1 shadow-md shadow-gray-400">
                <li
                  className="cursor-pointer select-none rounded-md p-2 hover:bg-green-200"
                  onClick={toggleDropdown}
                >
                  Đồ điện tử
                </li>
                <li
                  className="cursor-pointer select-none rounded-md p-2 hover:bg-green-200"
                  onClick={toggleDropdown}
                >
                  Ga nệm
                </li>
                <li
                  className="cursor-pointer select-none rounded-md p-2 hover:bg-green-200"
                  onClick={toggleDropdown}
                >
                  Điện thoại
                </li>
              </ul>
            )}
          </div>
          <div className="mx-2 h-6 border border-gray-400" />
          <div className="flex">
            <input
              className="outline-none"
              type="text"
              placeholder="Tìm kiếm sản phẩm"
            />
            <img src={SEARCH_ICON} className="w-6 hover:cursor-pointer" />
          </div>
        </div>
        <div className="mx-10 flex h-full grow-[4] items-center justify-end">
          <div className="mx-3">
            <img src={CART_ICON} alt="" className="inline" />
            <p className="inline">Cart</p>
          </div>
          <div className="mx-3">
            <img src={ACCOUNT_ICON} alt="" className="inline" />
            <p className="inline">Account</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default HeaderComponent;
