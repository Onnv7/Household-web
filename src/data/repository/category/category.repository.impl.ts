import { CategoryAPI } from '../../api/category.api';
import {
  CategoryEntity,
  dtoToCategoryEntity,
} from '../../../domain/entity/category.entity';
import { ICategoryRepository } from '../../../domain/repository/category.repository';

export class CategoryRepository implements ICategoryRepository {
  constructor(private api: CategoryAPI) {}

  async getCategoryList(): Promise<CategoryEntity[]> {
    const category = await this.api.getCategoryList();
    return dtoToCategoryEntity(category.categoryList);
  }
}
