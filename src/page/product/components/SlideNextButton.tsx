import { useSwiper } from 'swiper/react';
import NEXT_ICON from '../../../assets/icon/next_icon.svg';
export default function SlideNextButton() {
  const swiper = useSwiper();

  return (
    <button onClick={() => swiper.slideNext()} className="select-none">
      <img src={NEXT_ICON} alt="" className="w-[44px]" />
    </button>
  );
}
