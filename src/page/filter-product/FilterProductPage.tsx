import React, { useEffect, useState } from 'react';
import { useLocation, useParams, useSearchParams } from 'react-router-dom';
import productRepository from '../../data/repository/product';
import { GetProductListResponse } from '../../data/model/response/product.response';
import {
  ProductCardEntity,
  ProductCardPageEntity,
  ProductFilterQueryEntity,
} from '../../domain/entity/product.entity';
import ProductCardComponent from '../../common/components/ProductCardComponent';
import { getProductSearch } from '../../domain/usecase/search.usecase';
import FilterPanelComponent from './components/FilterPanelComponent';
import SortControlComponent from './components/SortControlComponent';
import { SortType } from '../../common/enum/enum';

function FilterProductPage() {
  const pageSize = 2;
  const location = useLocation();
  const queryUrl: ProductFilterQueryEntity = {
    key: new URLSearchParams(useLocation().search).get('key') ?? undefined,
    categoryId:
      Number(new URLSearchParams(useLocation().search).get('category')) ??
      undefined,
    sort:
      (new URLSearchParams(useLocation().search).get('sort') as SortType) ??
      undefined,
  };
  const [page, setPage] = useState({
    current: 1,
    total: 0,
  });
  const [productCardList, setProductCardList] = useState<ProductCardEntity[]>(
    [],
  );

  useEffect(() => {
    const loadingData = async () => {
      const data = await getProductSearch(page.current, pageSize, queryUrl);
      setProductCardList((prev) => {
        return [...prev, ...data.productCardList];
      });
    };
    loadingData();
  }, [page.current]);

  useEffect(() => {
    const loadingData = async () => {
      const data = await getProductSearch(1, pageSize, queryUrl);
      setProductCardList(data.productCardList);
      setPage({
        current: 1,
        total: data.totalPage,
      });
    };
    loadingData();
  }, [location.search]);
  return (
    <div className="mx-auto w-[80%]">
      <h1 className="text-[1.4rem] font-[500]">Kết quả</h1>
      <FilterPanelComponent />
      {!queryUrl.key && <SortControlComponent />}
      <div>
        <div className="grid grid-cols-5 gap-1">
          {productCardList &&
            productCardList &&
            productCardList.map((itemCard) => {
              return (
                <ProductCardComponent
                  productInfo={itemCard}
                  key={itemCard.id}
                />
              );
            })}
        </div>
        {page.total > page.current && (
          <button
            className="block mx-auto my-8 text-blue-500"
            onClick={async () => {
              setPage((prev) => {
                return { ...prev, current: page.current + 1 };
              });
            }}
          >
            Tải thêm sản phẩm
          </button>
        )}
      </div>
    </div>
  );
}

export default FilterProductPage;
