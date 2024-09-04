import { CategoryEntity } from '../entity/category.entity';

export interface ICategoryRepository {
  getCategoryList(): Promise<CategoryEntity[]>;
}
