type CategoryResponse = {
  id: number;
  name: string;
  imageUrl: string;
  productQuantity: number;
};

type GetCategoryVisibleListResponse = {
  categoryList: CategoryResponse[];
};

export type { GetCategoryVisibleListResponse, CategoryResponse };
