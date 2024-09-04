import ProductCardComponent from '../../../common/components/ProductCardComponent';
import { SwiperSlide, Swiper } from 'swiper/react';
import { Pagination, Autoplay, Navigation } from 'swiper/modules';

const RelatedProductComponent = () => {
  const productList = [
    <ProductCardComponent />,
    <ProductCardComponent />,
    <ProductCardComponent />,
    <ProductCardComponent />,
    <ProductCardComponent />,
    <ProductCardComponent />,
    <ProductCardComponent />,
    <ProductCardComponent />,
    <ProductCardComponent />,
  ];
  return (
    <>
      <h1 className="mb-6 inline-block border-b-2 border-[#BCE3C9] pb-3 text-[22px] font-[700]">
        Related products
      </h1>
      <div className="w-full overflow-y-visible">
        <Swiper
          grabCursor={true}
          centeredSlides={true}
          initialSlide={1}
          speed={200}
          slidesPerView={1}
          spaceBetween={1}
          autoplay={{
            delay: 2500,
          }}
          breakpoints={{
            // when window width is >= 320px
            320: {
              initialSlide: 1,
              slidesPerView: 2,
              spaceBetween: 0,
            },
            // when window width is >= 480px
            480: {
              initialSlide: 1,
              slidesPerView: 2,
              spaceBetween: 0,
            },
            // when window width is >= 640px
            1300: {
              initialSlide: 2,
              slidesPerView: 3,
              spaceBetween: 40,
            },
            1485: {
              initialSlide: 2,
              slidesPerView: 5,
              spaceBetween: 12,
            },
          }}
          modules={[Pagination, Autoplay]}
          pagination={{ clickable: true }}
        >
          {productList.map((product) => (
            <SwiperSlide>{product}</SwiperSlide>
          ))}
        </Swiper>
      </div>
    </>
  );
};

export default RelatedProductComponent;
