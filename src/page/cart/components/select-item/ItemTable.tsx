import { useEffect } from 'react';
import DELETE_ITEM_ICON from '../../../../assets/icon/delete_item_icon.svg';
import { useSelector } from 'react-redux';
import { cartSelector } from '../../../../store/selectors';
import ItemCart from './ItemCart';
import { useAppDispatch } from '../../../../store/store';
import {
  getItemCartListThunk,
  changeAllItemCartAction,
  clearAllItemCartAction,
} from '../../redux/cart.slice';
function ItemTable() {
  const dispatch = useAppDispatch();
  const cartPayload = useSelector(cartSelector);

  const handleSelectAll = (value: boolean) => {
    dispatch(changeAllItemCartAction(value));
  };
  const handleRemoveAll = () => {
    dispatch(clearAllItemCartAction());
  };
  useEffect(() => {
    const loadingData = async () => {
      await dispatch(getItemCartListThunk());
    };
    loadingData();
  }, []);

  return (
    <table className="mb-10">
      <thead className="h-[40px] overflow-hidden bg-white">
        <tr className="">
          <th className="rounded-l-md px-3">
            <input
              type="checkbox"
              className="h-[16px] w-[16px] accent-green-600"
              checked={
                cartPayload.itemList.length > 0 &&
                !cartPayload.itemList.find((item) => item.isSelected === false)
              }
              onChange={(e) => handleSelectAll(e.target.checked)}
            />
          </th>
          <th>Sản phẩm</th>
          <th>Giá</th>
          <th>Số lượng</th>
          <th className="">Thành tiền</th>
          <th className="min-w-[50px] rounded-r-md px-2">
            <img
              src={DELETE_ITEM_ICON}
              alt=""
              className="mx-auto cursor-pointer"
              onClick={handleRemoveAll}
            />
          </th>
        </tr>
      </thead>
      <tbody className="overflow-hidden before:block before:bg-[#f4f4f4] before:leading-[16px] before:text-[#f4f4f4] before:content-['x'] last:first:rounded-l-md">
        {cartPayload.itemList &&
          cartPayload.itemList.map((item) => {
            return (
              <ItemCart
                itemCart={item}
                key={item.productId + '' + item?.skuId}
              />
            );
          })}
      </tbody>
    </table>
  );
}

export default ItemTable;
