import { FaStar } from 'react-icons/fa';
import PRODUCT_1 from '../../assets/test/product-1-1.png';
import LOCO_ICON from '@src/assets/login_icon_image.png';
import { ProductCardEntity } from '../../domain/entity/product.entity';
import { useNavigate } from 'react-router-dom';
import { RouterConstants } from '../constant/route.constant';
import Skeleton from 'react-loading-skeleton';

type ItemCardComponentProps = {
  productInfo: ProductCardEntity;
};

const ProductCardComponent = ({ productInfo }: ItemCardComponentProps) => {
  const navigate = useNavigate();
  return (
    <div
      className="m-2 inline-block aspect-[3/4] w-[220px] rounded-[5px] border-[1px] bg-white shadow-sm transition-all hover:scale-[1.05] hover:cursor-pointer hover:shadow-xl"
      onClick={() => {
        navigate(RouterConstants.product.index + `/${productInfo.id}`);
        // navigate(`a`);
      }}
    >
      <img
        src={productInfo.imageUrl}
        alt=""
        className="mx-auto aspect-square w-[80%]"
      />
      <div className="p-4">
        <span className="my-5">
          <p>{productInfo.name}</p>
          <p className="font-bold">{productInfo.categoryName}</p>
        </span>

        <span>
          <p className="inline-block mr-4 line-through">$120</p>
          <p className="inline-block font-[700] text-[#0989FF]">
            ${productInfo.price || <Skeleton />}
          </p>
        </span>
      </div>
    </div>
  );
};

export default ProductCardComponent;
