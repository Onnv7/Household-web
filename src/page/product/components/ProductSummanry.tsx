import { useState } from 'react';
import StarReview from '../../../common/components/StartReview';
import ADD_TO_CART_ICON from '../../../assets/icon/add_to_cart_icon.png';
import UNFAVORITE_ICON from '../../../assets/icon/unfavorite_icon.png';
import { ProductDetailsEntity } from '../../../domain/entity/product.entity';
import { useAppDispatch } from '../../../store/store';
import { addProductToCart } from '../../../domain/usecase/product.usecase';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { toastNotification } from '../../../common/ultils/notification.ulti';
import { useAuthContext } from '../../../context/auth.context';
import { formatMoneyString } from '../../../common/ultils/format.ultil';
enum QuantityAction {
  INCREMENT,
  DECREMENT,
}
type ProductSummaryProps = {
  productInfo: ProductDetailsEntity;
};
const ProductSummary = ({ productInfo }: ProductSummaryProps) => {
  console.log('🚀 ~ ProductSummary ~ productInfo:', productInfo);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuthContext();

  const [quantity, setQuantity] = useState(1);
  const [price, setPrice] = useState<number>(
    productInfo.productSKUList?.length > 0
      ? productInfo.productSKUList[0].price
      : productInfo.price,
  );
  const [skuSelected, setSkuSelected] = useState<number | undefined>(
    new URLSearchParams(useLocation().search).get('sku')
      ? Number(new URLSearchParams(useLocation().search).get('sku'))
      : productInfo.productSKUList.length > 0
        ? productInfo.productSKUList[0].id
        : undefined,
  );
  console.log('🚀 ~ ProductSummary ~ skuSelected:', skuSelected);

  const handleQuantity = (action: QuantityAction) => {
    let newQuantity;
    if (action === QuantityAction.INCREMENT) {
      newQuantity = quantity + 1;
    } else {
      newQuantity = quantity - 1;
    }
    setQuantity(newQuantity <= 0 ? 1 : newQuantity);
  };

  const handleAddToCart = () => {
    if (!isAuthenticated()) {
      toastNotification({
        msg: `Vui lòng đăng nhập để mua hàng`,
        type: 'warning',
      });
    } else {
      const skuChosen = productInfo.productSKUList.find(
        (item) => item.id === skuSelected,
      );

      addProductToCart(productInfo.id, quantity, skuChosen?.id);
      toastNotification({
        msg: `Đã thêm ${quantity} ${productInfo.name} ${skuChosen?.name ? `- ${skuChosen?.name}` : ''} vào giỏ hàng`,
      });
    }
  };

  const handleChooseSKU = (price: number, skuId: number) => {
    setPrice(price);
    setSkuSelected(skuId);
    navigate(`?sku=${skuId}`, { replace: true });
  };

  return (
    <div className="p-4 h-fit">
      <h1 className="text-[3rem] font-[700] leading-[48px]">
        {productInfo.name}
      </h1>
      {/* <span className="flex items-center my-3">
        <StarReview rating={4} size={16} />
        <p className="text-[14px] text-[#B6B6B6]">(32 review)</p>
      </span> */}
      <h1 className="text-[2.5rem] font-bold text-primary-1">
        {formatMoneyString(price)}
      </h1>
      <p className="text-normal text-[#7E7E7E]">{productInfo?.summary}</p>

      <div className="flex flex-wrap gap-2">
        {productInfo?.productSKUList.map((sku, index) => {
          return (
            <div
              key={sku.id}
              className={
                'my-4 inline-block w-fit cursor-pointer rounded-sm border-[1px] px-2 py-1 ' +
                ((index === 0 && !skuSelected) || skuSelected === sku.id
                  ? 'border-primary-2'
                  : 'border-gray-400 bg-gray-100')
              }
              onClick={() => handleChooseSKU(sku.price, sku.id)}
            >
              <p className="text-normal">{sku.name}</p>
            </div>
          );
        })}
      </div>

      <div className="flex gap-2 py-3 my-3">
        <span className="flex w-[160px] rounded-md border-[2px] border-[#3BB77E] p-2">
          <div
            className="basis-1/3 cursor-pointer select-none text-center text-[20px] font-bold"
            onClick={() => handleQuantity(QuantityAction.DECREMENT)}
          >
            -
          </div>
          <input
            className="w-[20px] basis-1/3 text-center outline-none"
            value={quantity}
            onChange={() => {}}
          />
          <div
            className="basis-1/3 cursor-pointer select-none text-center text-[20px] font-bold"
            onClick={() => handleQuantity(QuantityAction.INCREMENT)}
          >
            +
          </div>
        </span>
        <button
          type="button"
          className="rounded-md bg-[#3BB77E] p-3 shadow-[0_35px_60px_-15px_rgba(0,0,0,0.3)]"
          onClick={() => handleAddToCart()}
        >
          <img
            className="inline-block size-[1rem]"
            src={ADD_TO_CART_ICON}
            alt=""
          />
          <p className="inline-block text-white uppercase">Thêm vào giỏ hàng</p>
        </button>
        <button
          type="button"
          className="flex w-[50px] items-center rounded-md align-middle shadow-lg"
        >
          <img src={UNFAVORITE_ICON} className="m-auto size-[1rem]" />
        </button>
      </div>
    </div>
  );
};
export default ProductSummary;
