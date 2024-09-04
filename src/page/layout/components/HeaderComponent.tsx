import { useEffect, useRef, useState } from 'react';
import LOGO_APP_ICON from '@src/assets/logo_icon.png';
import SEARCH_ICON from '@src/assets/search_icon.png';
import CART_ICON from '@src/assets/cart_icon.png';
import ACCOUNT_ICON from '@src/assets/account_icon.png';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAuthContext } from '../../../context/auth.context';
import { getUserProfile } from '../../../domain/usecase/global.usecase';
import { RouterConstants } from '../../../common/constant/route.constant';
import categoryRepository from '../../../data/repository/category/category.index';
import { toastNotification } from '../../../common/ultils/notification.ulti';
import { useControlPanel } from '../../../hook/useControlPanel';
import { CategoryFilterEntity } from '../../../domain/entity/category.entity';
const HeaderComponent = () => {
  const { userId, authDispatch } = useAuthContext();

  const navigate = useNavigate();
  const [categoryList, setCategoryList] = useState<CategoryFilterEntity[]>([]);
  const [userName, setUserName] = useState<string>();
  const [keySearch, setKeySearch] = useState('');
  let [searchParams, setSearchParams] = useSearchParams();

  const {
    isVisible: isVisibleCategory,
    handleOpen: handleOpenCategory,
    elementRef: elementRefCategory,
  } = useControlPanel();

  const {
    isVisible: isVisibleProfileMenu,
    handleOpen: handleOpenProfileMenu,
    elementRef: elementRefProfileMenu,
  } = useControlPanel();

  useEffect(() => {
    const loadData = async () => {
      if (userId) {
        const userProfile = await getUserProfile(userId!);
        setUserName(userProfile.username);
      } else {
        setUserName('Đăng nhập');
      }
    };
    loadData();
  }, [userId]);
  useEffect(() => {
    const loadingData = async () => {
      const categoryListData = (await categoryRepository.getCategoryList()).map(
        (category) => {
          return { name: category.name, id: category.id };
        },
      );
      setCategoryList(categoryListData);
    };
    loadingData();
  }, []);
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const key = params.get('key');
    if (key) {
      setKeySearch(key);
    } else {
      setKeySearch('');
    }
  }, [location.search]);

  function handleCategoryClick(categoryId: number) {
    navigate(`/search?category=${categoryId}`);
  }
  function handleOnSignOut() {
    authDispatch({ type: 'LOGOUT' });
    toastNotification({ msg: 'Đăng xuất thành công' });
  }
  function handleSearchProduct() {
    if (keySearch.trim() !== '') navigate(`/search?key=${keySearch}`);
    else navigate('/');
  }
  return (
    <div className="my-2">
      <div className="mb-2 flex h-[50px] w-full items-center justify-between">
        <img
          alt=""
          src={LOGO_APP_ICON}
          className="mx-5 h-full grow-[1] cursor-pointer object-scale-down"
          onClick={() => {
            navigate('/');
          }}
        />
        <div className="flex grow-[12] rounded-md border-2 border-primary-2 p-2">
          <div className="">
            <div className="px-3 cursor-pointer" onClick={handleOpenCategory}>
              <div className="select-none">Danh mục</div>
            </div>
            {isVisibleCategory && (
              <ul
                ref={elementRefCategory}
                className="absolute z-10 grid grid-cols-6 p-1 mt-3 rounded-md shadow-md bg-green-50 shadow-gray-400"
              >
                {categoryList &&
                  categoryList.map((item) => {
                    return (
                      <li
                        key={item.id}
                        className="p-2 rounded-md cursor-pointer select-none hover:bg-green-200"
                        onClick={() => handleCategoryClick(item.id)}
                      >
                        {item.name}
                      </li>
                    );
                  })}
              </ul>
            )}
          </div>
          <div className="h-6 mx-2 border border-gray-400" />
          <div className="flex grow-[1] justify-between">
            <input
              className="grow-[1] outline-none"
              type="text"
              placeholder="Tìm kiếm sản phẩm"
              value={keySearch}
              onKeyDown={(event) => {
                if (event.key === 'Enter') {
                  handleSearchProduct();
                }
              }}
              onChange={(e) => setKeySearch(e.target.value)}
            />
            <img
              src={SEARCH_ICON}
              className="w-6 hover:cursor-pointer"
              onClick={() => handleSearchProduct()}
            />
          </div>
        </div>
        <div className="flex h-full grow-[1] items-center justify-end">
          <div
            className="flex w-[120px] items-end justify-center rounded-md px-2 py-3 hover:cursor-pointer hover:bg-green-100"
            onClick={() => navigate('/cart')}
          >
            <img src={CART_ICON} alt="" className="inline" />
            <p className="inline">Giỏ hàng</p>
          </div>
          <div
            onClick={handleOpenProfileMenu}
            className="relative flex w-[120px] items-end justify-center rounded-md px-2 py-3 hover:cursor-pointer hover:bg-green-100"
          >
            <img src={ACCOUNT_ICON} alt="" className="inline" />
            <p className="inline">{userName || 'Đăng nhập'}</p>
            {isVisibleProfileMenu && (
              <ul
                ref={elementRefProfileMenu}
                className="absolute left-0 top-[100%] z-[100] w-[200px] rounded-md bg-white p-3 child-li:my-1 child-li:rounded-md child-li:px-2"
              >
                <li
                  className="hover:bg-green-300"
                  onClick={() => navigate('/register')}
                >
                  Thông tin cá nhân
                </li>
                <li className="hover:bg-green-300">Đơn hàng</li>
                <li className="hover:bg-green-300">Đổi mật khẩu</li>
                <li
                  className="hover:bg-green-300"
                  onClick={() => handleOnSignOut()}
                >
                  Đăng xuất
                </li>
              </ul>
            )}
          </div>
        </div>
      </div>
      <hr className="absolute right-0 w-[100vw]" />
      <div className="w-1/2 m-auto">
        <ul className="flex w-full justify-around child:cursor-pointer child:p-3 child:font-[500]">
          <li>Deals</li>
          <li>Home</li>
          <li>About</li>
          <li>Shop</li>
          <li>Contact</li>
        </ul>
      </div>
      <hr className="absolute right-0 w-[100vw]" />
    </div>
  );
};

export default HeaderComponent;
