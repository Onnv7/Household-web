import ProductImage from './components/ProductImageComponent';
import ProductReviewComponent from './components/ProductReviewComponent';
import { useLayoutEffect, useState } from 'react';
import { getProductDetails } from '../../domain/usecase/product.usecase';
import { useNavigate, useParams } from 'react-router-dom';
import { ProductDetailsEntity } from '../../domain/entity/product.entity';
import ProductSummary from './components/ProductSummanry';

enum InfoOption {
  DESCRIPTION,
  REVIEW,
}

const ProductPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [productInfoOption, setProductInfoOption] = useState(
    InfoOption.DESCRIPTION,
  );
  const [productData, setProductData] = useState<ProductDetailsEntity>();

  useLayoutEffect(() => {
    const loadingData = async () => {
      const data = await getProductDetails(Number(id));
      setProductData(data);
    };
    loadingData();
  }, [id]);

  return (
    <div className="mx-auto h-fit w-[80%]">
      <div className="mx-auto my-[36px]">
        <div className="grid grid-cols-[1fr_2fr] gap-4">
          <ProductImage imageList={productData?.productImageList} />
          {productData && <ProductSummary productInfo={productData} />}
        </div>
        <div className="col-[span_2] rounded-md border-[1px] p-3">
          <ul className="flex space-x-4 child-li:cursor-pointer child-li:rounded-[20px] child-li:border-[1px] child-li:px-4 child-li:py-2 child-li:text-[17px] child-li:font-[650] child-li:text-gray-1">
            <li
              className={
                productInfoOption === InfoOption.DESCRIPTION
                  ? 'text-primary-1'
                  : ''
              }
              onClick={() => setProductInfoOption(InfoOption.DESCRIPTION)}
            >
              Mô tả
            </li>
            <li
              className={
                productInfoOption === InfoOption.REVIEW ? 'text-primary-1' : ''
              }
              onClick={() => {
                // setProductInfoOption(InfoOption.REVIEW)
                navigate(`/a`);
              }}
            >
              Đánh giá
            </li>
          </ul>
          {productInfoOption === InfoOption.REVIEW ? (
            <ProductReviewComponent />
          ) : (
            <div>{productData?.description}</div>
          )}
        </div>
      </div>

      {/* <RelatedProductComponent /> */}
    </div>
  );
};

export default ProductPage;
