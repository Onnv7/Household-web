import addressRepository from '../../data/repository/address/address.index';
import cartRepository from '../../data/repository/cart/cart.index';
import orderRepository from '../../data/repository/order/order.index';
import { ItemCartEntity, DeliveryOrderInfoEntity } from '../entity/cart.entity';

export const getExistedItemCart = (
  itemList: ItemCartEntity[],
  productId: number,
  skuId?: number,
) => {
  return itemList.find((item) =>
    skuId ? item.skuId === skuId : item.productId === productId,
  );
};

export const removeItemCartFromList = (
  list: ItemCartEntity[],
  productId: number,
  skuId?: number,
) => {
  return list.filter(
    (item) => !(skuId ? item.skuId === skuId : item.productId === productId),
  );
};
export const modifyItemCartLocalStorage = (
  productId: number,
  quantity: number,
  skuId?: number,
) => {
  cartRepository.modifyItemCart(productId, quantity, skuId);
};

export const updateItemCartLocalStorage = (
  productId: number,
  quantity: number,
  skuId?: number,
) => {
  cartRepository.updateItemCart(productId, quantity, skuId);
};

export const clearAllItemCart = () => {
  cartRepository.clearItemCart();
};

export const getProvinceList = async () => {
  return await addressRepository.getProvinceList();
};

export const getDistrictList = async (provinceId: string) => {
  return await addressRepository.getDistrictList(provinceId);
};

export const getWardList = async (provinceId: string, wardId: string) => {
  return await addressRepository.getWardList(provinceId, wardId);
};

export const createOrder = async (
  userId: number,
  itemList: ItemCartEntity[],
  receiver: DeliveryOrderInfoEntity,
) => {
  const orderId = await orderRepository.createOrder(userId, itemList, receiver);

  if (orderId)
    itemList.forEach((item) => {
      cartRepository.removeProduct(item.productId, item.skuId);
    });
  return orderId;
};

export const getOrderBillResult = async (orderId: number) => {
  return await orderRepository.getOrderBillResult(orderId);
};

export const getOrderBillDetail = async (orderId: number) => {
  return await orderRepository.getOrderBillDetail(orderId);
};
