import React from 'react';
import { useSwiper } from 'swiper/react';
type ProductImageListProps = {
  imageList: string[];
  productIndex: number;
  onClick: (value: number) => void;
};
function ProductImageList({
  imageList,
  productIndex,
  onClick,
}: ProductImageListProps) {
  const swiper = useSwiper();
  return (
    <span className="my-4 flex justify-center overflow-scroll overflow-x-hidden overflow-y-hidden child-img:m-[4px] child-img:cursor-pointer child-img:rounded-md child-img:bg-gray-200 child-img:drop-shadow-md">
      {imageList.map((imageUrl, index) => {
        return (
          <img
            key={index}
            className={
              productIndex === index
                ? 'h-[80px] w-[80px] border-[1px] border-[#A2D2C9]'
                : 'h-[80px] w-[80px] border-[1px]'
            }
            src={imageUrl}
            alt=""
            onClick={() => {
              onClick(index);
              swiper.slideTo(index);
            }}
          />
        );
      })}
    </span>
  );
}

export default ProductImageList;
