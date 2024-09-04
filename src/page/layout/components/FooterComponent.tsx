import LOGO_APP_ICON from '@src/assets/logo_icon.png';
import LOCATION_ICON from '@src/assets/icon/location.png';
import CONTACT_ICON from '@src/assets/icon/contact.png';
import EMAIL_ICON from '@src/assets/icon/email.png';
import CLOCK_ICON from '@src/assets/icon/clock.png';
import PHONE_CALL_ICON from '@src/assets/icon/phone-call.png';
import FB_CIRCLE_ICON from '@src/assets/icon/fb_green_circle.png';
import IG_CIRCLE_ICON from '@src/assets/icon/ig_green_circle.png';
import TWITTER_CIRCLE_ICON from '@src/assets/icon/twitter_green_circle.png';
import YOUTUBE_CIRCLE_ICON from '@src/assets/icon/youtube_green_circle.png';
const FooterComponent = () => {
  return (
    <div className="mx-4 my-4">
      <div className="mx-4 grid grid-cols-[250px_minmax(100px,_1fr)] gap-4">
        <div className="heir-img:mr-1 heir-img:inline-block">
          <img src={LOGO_APP_ICON} />
          <p className="my-3">Awesome grocery store website template</p>
          <div>
            <img src={LOCATION_ICON} className="" />
            <p className="inline">
              <strong>Address: </strong>5171 W Campbell Ave undefined Kent, Utah
              53127 United States
            </p>
          </div>
          <div>
            <img src={CONTACT_ICON} className="" />
            <p className="inline">
              <strong>Call Us: </strong>(+91) - 540-025-124553
            </p>
          </div>
          <div>
            <img src={EMAIL_ICON} className="" />
            <p className="inline">
              <strong>Email: </strong>sale@Nest.com
            </p>
          </div>
          <div>
            <img src={CLOCK_ICON} className="" />
            <p className="inline">
              <strong>Hours: </strong>10:00 - 18:00, Mon - Sat
            </p>
          </div>
        </div>
        <div className="">
          <div className="grid grid-cols-4">
            <div className="heir-li:my-1">
              <p className="text-[24px] font-bold">Company</p>
              <ul>
                <li className="">About Us</li>
                <li className="">Delivery Information</li>
                <li className="">Privacy Policy</li>
                <li className="">Terms & Conditions</li>
                <li className="">Contact Us</li>
                <li className="">Support Center</li>
                <li className="">Careers</li>
              </ul>
            </div>
            <div className="heir-li:my-1">
              <p className="text-[24px] font-bold">Account</p>
              <ul>
                <li className="">Sign In</li>
                <li className="">View Cart</li>
                <li className="">My Wishlist</li>
                <li className="">Track My Order</li>
                <li className="">Help Ticket</li>
                <li className="">Shipping Details</li>
                <li className="">Compare products</li>
              </ul>
            </div>
            <div className="heir-li:my-1">
              <p className="text-[24px] font-bold">Corporate</p>
              <ul>
                <li className="">Become a Vendor</li>
                <li className="">Affiliate Program</li>
                <li className="">Farm Business</li>
                <li className="">Farm Careers</li>
                <li className="">Our Suppliers</li>
                <li className="">Accessibility</li>
                <li className="">Promotions</li>
              </ul>
            </div>
            <div className="heir-li:my-1">
              <p className="text-[24px] font-bold">Popular</p>
              <ul className="">
                <li className="">Milk & Flavoured Milk</li>
                <li className="">Butter and Margarine</li>
                <li className="">Eggs Substitutes</li>
                <li className="">Marmalades</li>
                <li className="">Sour Cream and Dips</li>
                <li className="">Tea & Kombucha</li>
                <li className="">Cheese</li>
              </ul>
            </div>
          </div>
        </div>
        {/* <div className="bg-primary-2">
          
        </div> */}
      </div>
      <hr className="my-5" />
      <div className="child-div: justify-ev flex">
        <div className="basis-1/4">
          <span>
            © 2022, <div className="inline text-primary-2">Nest</div> - HTML
            Ecommerce Template All rights reserved
          </span>
          <p></p>
        </div>
        <div className="flex basis-2/4 justify-center heir-img:mr-2">
          <div className="mx-3 flex items-center">
            <img src={PHONE_CALL_ICON} alt="" className="h-[38px] w-[30px]" />
            <span className="inline-block">
              <p className="text-[30px] font-bold leading-[33px] text-primary-2">
                1900 - 6666
              </p>
              <p className="text-[12px] text-gray-500">Working 8:00 - 22:00</p>
            </span>
          </div>
          <div className="mx-3 flex items-center">
            <img src={PHONE_CALL_ICON} alt="" className="h-[38px] w-[30px]" />
            <span className="inline-block">
              <p className="text-[30px] font-bold leading-[33px] text-primary-2">
                1900 - 8888
              </p>
              <p className="text-[12px] text-gray-500">24/7 Support Center</p>
            </span>
          </div>
        </div>
        <div className="basis-1/4">
          <div className="flex">
            <p className="mr-3 font-bold">Follow Us</p>
            <span className="flex child:mx-1">
              <img src={FB_CIRCLE_ICON} alt="" />
              <img src={IG_CIRCLE_ICON} alt="" />
              <img src={TWITTER_CIRCLE_ICON} alt="" />
              <img src={YOUTUBE_CIRCLE_ICON} alt="" />
            </span>
          </div>

          <p>Up to 15% discount on your first subscribe</p>
        </div>
      </div>
    </div>
  );
};

export default FooterComponent;
