import { useEffect, useState } from 'react';
import CategoryCardComponent from './CategoryCardComponent';
import DELIVERY_ICON from '@src/assets/icon/delivery_icon.png';
import REFUND_ICON from '@src/assets/icon/refund_icon.png';
import DISCOUNT_ICON from '@src/assets/icon/discount_icon.png';
import SUPPORT_ICON from '@src/assets/icon/support_icon.png';
import { getCategoryList } from '../../../../domain/usecase/home.usecase';
import { CategoryEntity } from '../../../../domain/entity/category.entity';

const CategoryListComponent = () => {
  const [categoryList, setCategoryList] = useState<CategoryEntity[]>([]);

  useEffect(() => {
    const getCategoryData = async () => {
      const data = await getCategoryList();
      setCategoryList(data);
    };
    getCategoryData();
  }, []);

  return (
    <div className="my-8">
      <div className="mb-4">
        <span className="flex items-center justify-between">
          <h1 className="text-[1.4rem] font-[700]">Danh mục sản phẩm</h1>
          <p className="cursor-pointer">Xem tất cả &gt;</p>
        </span>
        <div className="flex h-[200px] items-center justify-center">
          {categoryList.map((category) => (
            <CategoryCardComponent category={category} key={category.id} />
          ))}
        </div>
      </div>

      <div className="flex justify-center mt-9 child:mx-4">
        <div className="flex w-fit items-center rounded-sm bg-[#F6F7F9] px-3 py-5">
          <img src={DELIVERY_ICON} alt="" className="inline-block mx-2" />
          <span className="inline-block">
            <p className="font-bold">Free Delivery</p>
            <p>Orders from all item</p>
          </span>
        </div>
        <div className="flex w-fit items-center rounded-sm bg-[#F6F7F9] px-3 py-5">
          <img src={REFUND_ICON} alt="" className="inline-block mx-2" />
          <span className="inline-block">
            <p className="font-bold">Return & Refund</p>
            <p>Maney back guarantee</p>
          </span>
        </div>
        <div className="flex w-fit items-center rounded-sm bg-[#F6F7F9] px-3 py-5">
          <img src={DISCOUNT_ICON} alt="" className="inline-block mx-2" />
          <span className="inline-block">
            <p className="font-bold">Member Discount</p>
            <p>One very order over $140.00</p>
          </span>
        </div>
        <div className="flex w-fit items-center rounded-sm bg-[#F6F7F9] px-3 py-5">
          <img src={SUPPORT_ICON} alt="" className="inline-block mx-2" />
          <span className="inline-block">
            <p className="font-bold">Support 24/7</p>
            <p>Contact us 24 hours a day</p>
          </span>
        </div>
      </div>
    </div>
  );
};

export default CategoryListComponent;
