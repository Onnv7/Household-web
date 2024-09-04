import DROP_DOWN_ICON from '@src/assets/icon/drop_down_icon.png';
import { useEffect, useState } from 'react';
import { getCategoryList } from '../../../domain/usecase/home.usecase';
import { CategoryFilterEntity } from '../../../domain/entity/category.entity';
import { useControlPanel } from '../../../hook/useControlPanel';
import { useSearchParams } from 'react-router-dom';
function FilterPanelComponent() {
  const [categoryList, setCategoryList] = useState<CategoryFilterEntity[]>([]);
  const [categorySelected, setCategorySelected] = useState('');
  const { isVisible, handleOpen, elementRef } = useControlPanel();
  let [searchParams, setSearchParams] = useSearchParams();
  const params = new URLSearchParams(searchParams);

  useEffect(() => {
    const categoryId = Number(params.get('category'));
    const fetchData = async () => {
      const data = await getCategoryList().then((data) =>
        data.map((item) => {
          if (item.id === categoryId) {
            setCategorySelected(item.name);
          }
          return {
            name: item.name,
            id: item.id,
          } as CategoryFilterEntity;
        }),
      );
      setCategoryList(data);
    };
    fetchData();
  }, []);

  const handleCategoryClick = (id: number, name: string) => {
    setCategorySelected(name);
    setSearchParams((prev) => {
      const params = new URLSearchParams(prev);
      params.set('category', id.toString());
      return params;
    });
  };
  return (
    <div className="relative my-2">
      <ul>
        <li
          className="inline-block cursor-pointer rounded-md border-[1px] border-gray-300 p-2"
          onClick={() => handleOpen()}
        >
          <p className="inline-block">Danh mục: {categorySelected}</p>
          <img
            src={DROP_DOWN_ICON}
            alt=""
            className="ml-2 inline-block size-[0.8rem]"
          />
          <span
            ref={elementRef}
            className={`absolute left-0 top-[100%] z-[10] mt-1 grid w-full grid-cols-5 rounded-md border-[1px] border-gray-300 bg-white p-3 ${isVisible ? 'visible' : 'hidden'}`}
          >
            {categoryList.map((category) => {
              return (
                <div
                  className="rounded-md p-2 hover:bg-gray-300"
                  onClick={() =>
                    handleCategoryClick(category.id, category.name)
                  }
                >
                  {category.name}
                </div>
              );
            })}
          </span>
        </li>
      </ul>
    </div>
  );
}

export default FilterPanelComponent;
