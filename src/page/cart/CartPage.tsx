import CartSummary from './components/select-item/CartSummary';
import ItemTable from './components/select-item/ItemTable';
import OrderStepper from './components/select-item/OrderStepper';
import { useLocation, useNavigate } from 'react-router-dom';
import OrderResult from './components/order-result/OrderResult';
import { useSelector } from 'react-redux';
import { cartSelector } from '../../store/selectors';
import { useEffect } from 'react';
import DeliveryInformation from './components/delivery/DeliveryInformation';
import { FormProvider } from '../../context/delivery-form.context';
import { useAuthContext } from '../../context/auth.context';

const CartPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const page = queryParams.get('page');
  const cartPayload = useSelector(cartSelector);
  const selectedItem = cartPayload.itemList.find((item) => item.isSelected)
    ? true
    : false;
  const step =
    page === 'order_result' && selectedItem
      ? 3
      : page === 'delivery' && selectedItem
        ? 2
        : 1;

  useEffect(() => {
    if ((page === 'order_result' || page === 'delivery') && !selectedItem) {
      navigate('/cart', { replace: true });
    }
  }, [page, selectedItem, navigate]);

  return (
    <div className="h-full w-[100%] bg-gray-2">
      <OrderStepper step={step} />
      {step === 2 ? (
        <div className="mx-auto w-[60%]">
          {/* <FormProvider> */}
          <DeliveryInformation />
          {/* </FormProvider> */}
        </div>
      ) : step === 3 ? (
        <OrderResult />
      ) : (
        <div className="mx-auto grid w-[80%] grid-cols-[1fr_400px] grid-rows-[fit_1fr] gap-2">
          <div className="col-span-2">
            <h1 className="mt-4 text-[30px] font-[700]">Chọn sản phẩm</h1>
          </div>
          <ItemTable />
          <CartSummary />
        </div>
      )}
    </div>
  );
};

export default CartPage;
