import PRODUCT_IMAGE from '../../../../assets/test/product-1-1.png';
import EDIT_NOTE_ICON from '../../../../assets/icon/edit_note_icon.svg';
import { useSelector } from 'react-redux';
import { cartSelector } from '../../../../store/selectors';
import ItemNoteModal from './ItemNoteModal';
import { useState } from 'react';
import { useAppDispatch } from '../../../../store/store';
import { noteItemCartAction } from '../../redux/cart.slice';
import {
  formatMoneyString,
  formatNumber,
} from '../../../../common/ultils/format.ultil';

function ItemCartSelected() {
  const dispatch = useAppDispatch();
  const cartPayload = useSelector(cartSelector);
  const [openModalIndex, setOpenModalIndex] = useState<number | null>(null);

  const getProductSelected = () => {
    return cartPayload.itemList.filter((item) => item.isSelected);
  };
  return (
    <div className="my-5 w-[100%] rounded-md bg-white p-3">
      <h2 className="mb-3 font-[600]">
        Sản phẩm ({getProductSelected().length})
      </h2>
      <div>
        <table className="w-[100%] gap-2">
          <thead className="mb-3 h-[40px] overflow-hidden bg-[#F7F8F9]">
            <th className="rounded-l-md px-2 text-start">Sản phẩm</th>
            <th>Đơn giá</th>
            <th>Số lượng</th>
            <th>Thành tiền</th>
          </thead>
          <tbody>
            {getProductSelected().length > 0 &&
              getProductSelected().map((item, index) => {
                const isModalOpen = openModalIndex === index;
                return (
                  <tr className="child:text-center" key={item.skuId}>
                    <td className="not-child">
                      <div className="mt-3 flex h-full items-center">
                        <img
                          src={item.imageUrl}
                          alt=""
                          className="mx-2 h-[60px] w-[60px] rounded-md border-[1px]"
                        />
                        <div className="flex h-[60px] flex-col justify-between py-[4px]">
                          <p className="text-[14px]">{item.price}</p>
                          <div className="flex items-center text-[14px]">
                            <p
                              className="cursor-pointer text-primary-2"
                              onClick={() => setOpenModalIndex(index)}
                            >
                              {item.note ? item.note : 'Thêm ghi chú'}
                            </p>
                            {isModalOpen && (
                              <ItemNoteModal
                                value={item.note}
                                onSubmit={(text) => {
                                  dispatch(
                                    noteItemCartAction({
                                      productId: item.productId,
                                      skuId: item.skuId,
                                      note: text,
                                    }),
                                  );
                                }}
                                onClose={() => setOpenModalIndex(null)}
                              />
                            )}
                            <img
                              src={EDIT_NOTE_ICON}
                              alt=""
                              className="mx-2 w-[20px]"
                            />
                          </div>
                        </div>
                      </div>
                    </td>
                    <td>{formatMoneyString(item.price)}đ</td>
                    <td>x{formatNumber(item.quantity)}</td>
                    <td>{formatMoneyString(item.price * item.quantity)}đ</td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ItemCartSelected;
