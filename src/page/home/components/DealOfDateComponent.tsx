import { useEffect, useState } from 'react';
import ProductCardComponent from '../../../common/components/ProductCardComponent';
import {
  Pagination,
  Navigation,
  Autoplay,
  FreeMode,
  EffectCreative,
  EffectCoverflow,
} from 'swiper/modules';
import { SwiperSlide, Swiper } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';

const DealOfDateComponent = () => {
  const items = [
    // <ItemCardComponent key="1" />,
    // <ItemCardComponent key="2" />,
    // <ItemCardComponent key="3" />,
    // <ItemCardComponent key="4" />,
    // <ItemCardComponent key="5" />,
    // <ItemCardComponent key="6" />,
    // <ItemCardComponent key="7" />,
    // <ItemCardComponent key="8" />,
    // <ItemCardComponent key="9" />,
  ];
  return (
    <div className="relative my-20 bg-[#EAE2DE] py-12">
      <h1 className="mx-auto w-[80%] text-[32px] font-[700]">
        Deals Of The Day
      </h1>
      <Swiper
        className="mx-auto w-[80%]"
        grabCursor={true}
        // centeredSlides={true}
        initialSlide={1}
        speed={600}
        slidesPerView={3}
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
            initialSlide: 1,
            slidesPerView: 3,
            spaceBetween: 40,
          },
          1485: {
            initialSlide: 1,
            slidesPerView: 6,
            spaceBetween: 12,
          },
        }}
        modules={[Pagination, Autoplay, Navigation]}
        navigation={false}
        pagination={{ clickable: true }}
      >
        {items.map((item, index) => {
          return (
            <SwiperSlide className="w-[250px] overflow-hidden">
              {item}
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
};

export default DealOfDateComponent;
