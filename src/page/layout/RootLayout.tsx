import { Outlet } from 'react-router-dom';
import FooterComponent from './components/FooterComponent';
import HeaderComponent from './components/HeaderComponent';

const RootLayout = () => {
  return (
    <>
      <div className="">
        <HeaderComponent></HeaderComponent>
        <div className="h-fit">
          <Outlet />
          {/* <BannerSubscribeComponent /> */}
        </div>
        <div>
          <FooterComponent></FooterComponent>
        </div>
      </div>
    </>
  );
};

export default RootLayout;
