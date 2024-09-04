import { useState } from 'react';
import { SwiperSlide, Swiper } from 'swiper/react';
import SlideNextButton from './SlideNextButton';
import SlidePrevButton from './SlidePrevButton';
import ProductImageList from './ProductImageList';

type ProductImageProps = {
  imageList?: string[];
};

const ProductImage = ({ imageList = [] }: ProductImageProps) => {
  const [productIndex, setProductIndex] = useState(0);

  return (
    <div className="flex h-full w-full flex-col items-center">
      <div className="z-50 h-fit w-fit">
        <Swiper
          slidesPerView={1}
          grabCursor={true}
          className="w-[400px]"
          onSlideChange={({ realIndex }) => setProductIndex(realIndex)}
        >
          {imageList?.map((image, index) => {
            return (
              <SwiperSlide
                className="flex h-[400px] items-center justify-center overflow-hidden rounded-md border-[1px]"
                key={index}
              >
                <img
                  className="size-[24rem] select-none object-fill"
                  src={image}
                  alt=""
                />
              </SwiperSlide>
            );
          })}
          <span className="absolute top-0 z-[2] flex h-[400px] w-full items-center justify-center opacity-0 transition-opacity ease-in-out hover:opacity-100">
            <span className="flex w-full items-center justify-between px-3">
              <SlidePrevButton />
              <SlideNextButton />
            </span>
          </span>
          <div className="">
            <ProductImageList
              imageList={imageList}
              productIndex={productIndex}
              onClick={(value) => {
                setProductIndex(value);
              }}
            />
          </div>
        </Swiper>
      </div>
    </div>
  );
};
export default ProductImage;
