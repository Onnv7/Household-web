import { useNavigate } from 'react-router-dom';
import { CategoryEntity } from '../../../../domain/entity/category.entity';

type CategoryCardComponentProps = {
  category: CategoryEntity;
};

const CategoryCardComponent = ({ category }: CategoryCardComponentProps) => {
  const navigate = useNavigate();
  const handleCategoryCardClick = () => {
    navigate(`/search?category=${category.id}`);
  };
  return (
    <div
      className="flex flex-col mx-4 my-5 cursor-pointer"
      onClick={() => handleCategoryCardClick()}
    >
      <div className="mx-auto flex size-[120px] items-center justify-center rounded-full bg-blue-100">
        <img
          src={category.imageUrl}
          alt=""
          className="size-[60px] object-cover align-middle mix-blend-multiply"
        />
      </div>
      <p className="mt-2 truncate text-center text-[16px] font-bold">
        {category.name}
      </p>
      <p className="text-center text-[16px]">
        {category.productQuantity} sản phẩm
      </p>
    </div>
  );
};
export default CategoryCardComponent;
