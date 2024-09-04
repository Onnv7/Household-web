import { ItemCartStorageEntity } from '../../domain/entity/cart.entity';

export class CartLocalStorage {
  constructor() {}

  getItemCartListLocalStorage = () => {
    const productList = localStorage.getItem('products');
    const products = productList
      ? (JSON.parse(productList) as ItemCartStorageEntity[])
      : [];

    return products;
  };
}
