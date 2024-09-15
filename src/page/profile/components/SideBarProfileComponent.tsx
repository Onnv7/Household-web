import AVATAR_IMG from '@src/assets/test/naruto_avatar.png';
import PROFILE_ICON from '@src/assets/icon/profile_icon.png';
import ORDER_BILL_ICON from '@src/assets/icon/cart_icon.png';
import WISHLIST_ICON from '@src/assets/icon/wishlist.png';
import PASSWORD_ICON from '@src/assets/icon/lock_icon.png';
import { RouterConstants } from '../../../common/constant/route.constant';
import { useNavigate } from 'react-router-dom';
function SideBarProfileComponent() {
  const navigate = useNavigate();
  return (
    <div className="px-4 py-2">
      <div className="mb-4 flex items-center gap-[1rem]">
        <img src={AVATAR_IMG} alt="" className="size-[5rem] rounded-full" />
        <h3 className="grow text-[1.4rem] font-[600]">Nguyen An</h3>
      </div>
      <hr />
      <ul className="my-2 child-li:flex child-li:w-full child-li:cursor-pointer child-li:gap-2 child-li:rounded-md child-li:p-2 heir-img:size-[1.4rem]">
        <li
          className="hover:bg-hover-gray-1"
          onClick={() => navigate(RouterConstants.account.profile)}
        >
          <img src={PROFILE_ICON} alt="" />
          <p>Thông tin cá nhân</p>
        </li>
        <li
          className="hover:bg-hover-gray-1"
          onClick={() => navigate(RouterConstants.account.password)}
        >
          <img src={PASSWORD_ICON} alt="" />
          <p>Đổi mật khẩu</p>
        </li>
        <li
          className="hover:bg-hover-gray-1"
          onClick={() => navigate(RouterConstants.account.history)}
        >
          <img src={ORDER_BILL_ICON} alt="" />
          <p>Quản lý đơn hàng</p>
        </li>
        <li className="hover:bg-hover-gray-1">
          <img src={WISHLIST_ICON} alt="" />
          <p>Danh sách sản phẩm yêu thích</p>
        </li>
      </ul>
    </div>
  );
}

export default SideBarProfileComponent;
