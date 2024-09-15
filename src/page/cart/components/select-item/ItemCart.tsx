import { useMemo, useState } from 'react';
import DELETE_ITEM_ICON from '../../../../assets/icon/delete_item_icon.svg';
import { useAppDispatch } from '../../../../store/store';

import { ItemCartEntity } from '../../../../domain/entity/cart.entity';
import {
  modifyItemCartAction,
  selectItemCartAction,
  updateItemCartQuantityAction,
} from '../../redux/cart.slice';
import { isValidNumber } from '../../../../common/ultils/number.ultils';
import { formatMoneyString } from '../../../../common/ultils/format.ultil';
import { Link } from 'react-router-dom';

type ItemCartProps = {
  itemCart: ItemCartEntity;
};

const ItemCart = ({ itemCart }: ItemCartProps) => {
  const dispatch = useAppDispatch();
  const handleQuantity = (quantityModify: number) => {
    dispatch(
      modifyItemCartAction({
        productId: itemCart.productId,
        skuId: itemCart.skuId,
        quantity: quantityModify,
      }),
    );
  };
  const handleRemoveItem = () => {
    dispatch(
      updateItemCartQuantityAction({
        productId: itemCart.productId,
        skuId: itemCart.skuId,
        quantity: 0,
      }),
    );
  };
  const handleSelectItem = (value: boolean) => {
    dispatch(
      selectItemCartAction({
        productId: itemCart.productId,
        isChecked: value,
        skuId: itemCart.skuId,
      }),
    );
  };
  return (
    <tr className="child:bg-white">
      <td className="rounded-l-md text-center">
        <input
          type="checkbox"
          className="h-[16px] w-[16px] accent-green-600"
          checked={itemCart.isSelected}
          onChange={(e) => handleSelectItem(e.target.checked)}
        />
      </td>
      <td className="px-3 py-3">
        <Link
          className="flex w-[500px] cursor-pointer items-center justify-start"
          to={`/product/${itemCart.productId}${
            itemCart.skuId ? `?sku=${itemCart.skuId}` : ''
          }`}
        >
          <img
            className="mr-2 h-[60px] w-[60px] rounded-md border-[1px]"
            src={itemCart.imageUrl}
            alt=""
          />
          <p>
            {itemCart.productName +
              (itemCart.skuName ? ' - ' + itemCart.skuName : '')}
          </p>
        </Link>
      </td>
      <td className="px-3">{formatMoneyString(itemCart.price)}</td>
      <td className="px-3">
        <span className="flex w-[160px] justify-center">
          <button
            className="select-none rounded-md border-[1px] px-2 font-bold text-green-700"
            onClick={() => handleQuantity(-1)}
          >
            -
          </button>
          <input
            className="mx-1 w-[40px] select-none rounded-lg border-[1px] px-3 text-center outline-none"
            type="text"
            value={itemCart.quantity}
            onChange={(e) => {
              if (isValidNumber(e.target.value)) {
                dispatch(
                  updateItemCartQuantityAction({
                    productId: itemCart.productId,
                    quantity: Number(e.target.value),
                    skuId: itemCart.skuId,
                  }),
                );
              }
            }}
          />
          <button
            className="select-none rounded-md border-[1px] px-2 font-bold text-green-700"
            onClick={() => handleQuantity(1)}
          >
            +
          </button>
        </span>
      </td>
      <td className="text-center font-[500] text-green-600">
        {formatMoneyString(itemCart.price * itemCart.quantity)}
      </td>
      <td className="rounded-br-md rounded-tr-md text-center">
        <img
          src={DELETE_ITEM_ICON}
          alt="a"
          className="mx-auto cursor-pointer"
          onClick={() => handleRemoveItem()}
        />
      </td>
    </tr>
  );
};

export default ItemCart;
