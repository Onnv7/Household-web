import React, { useEffect, useState } from 'react';
import { ProductCardPageEntity } from '../../../../domain/entity/product.entity';
import { getProductPage } from '../../../../domain/usecase/home.usecase';
import ProductCardComponent from '../../../../common/components/ProductCardComponent';

import { SwiperSlide, Swiper, useSwiper } from 'swiper/react';

function FeatureProductListComponent() {
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
    <div className="my-8">
      <span className="flex items-center justify-between mb-4">
        <h1 className="text-[1.4rem] font-[700]">Sản phẩm nổi bật</h1>{' '}
        <p className="cursor-pointer">Xem tất cả &gt;</p>
      </span>
      <Swiper
        slidesPerView={5}
        grabCursor={true}
        className=""
        initialSlide={0}
        centeredSlides={false}
      >
        {productCardPage &&
          productCardPage.productCardList &&
          productCardPage.productCardList.map((itemCard) => {
            return (
              <SwiperSlide key={itemCard.id}>
                <div className="">
                  <ProductCardComponent
                    productInfo={itemCard}
                    key={itemCard.id}
                  />
                </div>
              </SwiperSlide>
            );
          })}
      </Swiper>
    </div>
  );
}

export default FeatureProductListComponent;
