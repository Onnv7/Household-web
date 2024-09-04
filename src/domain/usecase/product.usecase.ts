import { ItemCartStorageModel } from '../../data/model/category.model';
import cartRepository from '../../data/repository/cart/cart.index';
import productRepository from '../../data/repository/product';

export const getProductDetails = async (id: number) => {
  const data = await productRepository.getProductDetails(id);
  return data;
};
export const addProductToCart = (
  productId: number,
  quantity: number,
  skuId?: number,
) => {
  const itemCart = { productId, skuId, quantity } as ItemCartStorageModel;
  cartRepository.addItemToCart(itemCart);
};
