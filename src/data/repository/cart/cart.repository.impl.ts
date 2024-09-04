import {
  dtoToItemCartEntityList,
  ItemCartStorageEntity,
} from '../../../domain/entity/cart.entity';
import { ICartRepository } from '../../../domain/repository/cart.repository';
import { CartLocalStorage } from '../../local/cart.localstorage';
import { ItemCartStorageModel } from '../../model/category.model';

export class CartRepository implements ICartRepository {
  constructor(private localStorage: CartLocalStorage) {}

  getItemCartList(): ItemCartStorageEntity[] {
    const itemCartStorageEntityList =
      this.localStorage.getItemCartListLocalStorage();

    return dtoToItemCartEntityList(itemCartStorageEntityList);
  }

  addItemToCart(newProduct: ItemCartStorageModel) {
    const productList = localStorage.getItem('products');
    const products = productList
      ? (JSON.parse(productList) as ItemCartStorageModel[])
      : [];

    const existingProduct = products.find((item) =>
      newProduct.skuId
        ? item.skuId === newProduct.skuId
        : item.productId === newProduct.productId,
    );

    if (existingProduct) {
      existingProduct.quantity += newProduct.quantity;
    } else {
      products.push(newProduct);
    }
    localStorage.setItem('products', JSON.stringify(products));
  }

  modifyItemCart(productId: number, quantity: number, skuId?: number) {
    const productList = localStorage.getItem('products');
    let products = productList
      ? (JSON.parse(productList) as ItemCartStorageModel[])
      : [];
    const existingProduct = products.find(
      (item) => item.productId === productId && item.skuId === skuId,
    );

    if (existingProduct) {
      existingProduct.quantity += quantity;
      if (existingProduct.quantity < 1) {
        products = products.filter(
          (item) =>
            !(
              item.productId === existingProduct.productId &&
              item.skuId === existingProduct.skuId
            ),
        );
      }
    }
    localStorage.setItem('products', JSON.stringify(products));
  }
  updateItemCart(productId: number, quantity: number, skuId?: number) {
    const productList = localStorage.getItem('products');
    let products = productList
      ? (JSON.parse(productList) as ItemCartStorageModel[])
      : [];
    const existingProduct = products.find(
      (item) => item.productId === productId && item.skuId === skuId,
    );

    if (existingProduct) {
      existingProduct.quantity = quantity;
      if (existingProduct.quantity < 1) {
        products = products.filter(
          (item) =>
            !(
              item.productId === existingProduct.productId &&
              item.skuId === existingProduct.skuId
            ),
        );
      }
    }
    localStorage.setItem('products', JSON.stringify(products));
  }

  clearItemCart() {
    localStorage.removeItem('products');
  }
  removeProduct(productId: number, skuId?: number) {
    const productList = localStorage.getItem('products');
    let products = productList
      ? (JSON.parse(productList) as ItemCartStorageModel[])
      : [];
    const updatedCartItems = products.filter(
      (item) => item.productId !== productId && item.skuId !== skuId,
    );

    localStorage.setItem('products', JSON.stringify(updatedCartItems));
  }
}
