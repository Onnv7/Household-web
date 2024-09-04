import BANNER_SUBSCRIBE from '../../assets/test/banner-subcribe.png';
const BannerSubscribeComponent = () => {
  return (
    <div className="py-10">
      <span className="relative my-4">
        <p className="absolute left-[312px] top-[70px] text-[16px] leading-[26px] text-[#7E7E7E]">
          Sale 20% off all store
        </p>
        <h1 className="absolute left-[312px] top-[96px] inline-block w-[530px] text-[40px] font-[700] leading-[40px]">
          Subscribe our Newsletter
        </h1>
        <img src={BANNER_SUBSCRIBE} alt="" />
        <span className="absolute left-[1082px] top-[73px] flex">
          <input
            className="h-[40px] w-[300px] rounded-l-md p-4 outline-none"
            placeholder="Enter Your Email"
          />
          <div className="inline-block h-[40px] rounded-r-md bg-[#010F1C] px-2 text-center leading-[40px] text-white">
            Subscribe
          </div>
        </span>
      </span>
    </div>
  );
};

export default BannerSubscribeComponent;
