import BannerComponent from '../../common/BannerComponent';
import CategoryListComponent from './components/CategoryList/CategoryListComponent';
import ProductCardComponent from '../../common/components/ProductCardComponent';
import { useEffect, useLayoutEffect, useState } from 'react';
import { ProductCardPageEntity } from '../../domain/entity/product.entity';
import { getProductPage } from '../../domain/usecase/home.usecase';
import FeatureProductListComponent from './components/FeaturedProductList/FeatureProductListComponent';

const HomePage = () => {
  const [productCardPage, setProductCardPage] =
    useState<ProductCardPageEntity>();
  useEffect(() => {
    const getProductPageData = async () => {
      const data = await getProductPage(1, 12, undefined);
      setProductCardPage(data);
    };

    getProductPageData();
  }, []);

  return (
    <>
      <div className="mx-auto w-[80%]">
        <div className="mb-4 flex aspect-[5/1] w-full justify-center">
          <BannerComponent />
        </div>
        <CategoryListComponent />

        <FeatureProductListComponent />
      </div>
      {/* <DealOfDateComponent></DealOfDateComponent> */}
    </>
  );
};

export default HomePage;
