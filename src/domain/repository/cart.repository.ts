import { ItemCartStorageModel } from '../../data/model/category.model';
import { ItemCartStorageEntity } from '../entity/cart.entity';

export interface ICartRepository {
  getItemCartList(): ItemCartStorageEntity[];
}
