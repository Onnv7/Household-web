import DROP_DOWN_ICON from '@src/assets/icon/drop_down_icon.png';
import { useEffect, useRef, useState } from 'react';
import { useControlPanel } from '../../../hook/useControlPanel';
import { useSearchParams } from 'react-router-dom';
import { SortType } from '../../../common/enum/enum';
function SortControlComponent() {
  const [sortFiler, setSortFilter] = useState('Mặc định');
  const { isVisible, elementRef, handleOpen } = useControlPanel();
  let [searchParams, setSearchParams] = useSearchParams();
  const params = new URLSearchParams(searchParams);

  const handleSortOptionClick = (
    e: React.MouseEvent<HTMLLIElement, MouseEvent>,
    sortType?: SortType,
  ) => {
    setSortFilter(e.currentTarget.textContent!.toString());
    setSearchParams((prev) => {
      const params = new URLSearchParams(prev);

      if (sortType) {
        params.set('sort', sortType.toString());
      }

      return params;
    });
  };
  return (
    <div className="my-2">
      <h3
        className="relative inline-block cursor-pointer rounded-md border-[1px] border-gray-300 p-2"
        onClick={() => handleOpen()}
      >
        Sắp xếp: {sortFiler}
        <img
          src={DROP_DOWN_ICON}
          alt=""
          className="ml-2 inline-block size-[0.8rem]"
        />
        <div
          ref={elementRef}
          className={`absolute right-0 z-[20] my-4 w-fit rounded-md border-[1px] border-gray-300 bg-white p-2 ${isVisible ? 'visible' : 'hidden'}`}
        >
          <ul className="">
            <li
              className="rounded-md p-1 hover:bg-gray-200"
              onClick={(e) => handleSortOptionClick(e, SortType.ASC_PRICE)}
            >
              Giá từ thấp - cao
            </li>

            <li
              className="rounded-md p-1 hover:bg-gray-200"
              onClick={(e) => handleSortOptionClick(e, SortType.DESC_PRICE)}
            >
              Giá từ cao - thấp
            </li>

            <li
              className="rounded-md p-1 hover:bg-gray-200"
              onClick={(e) =>
                handleSortOptionClick(e, SortType.ASC_ALPHABETICAL)
              }
            >
              Tên A-Z
            </li>

            <li
              className="rounded-md p-1 hover:bg-gray-200"
              onClick={(e) =>
                handleSortOptionClick(e, SortType.DESC_ALPHABETICAL)
              }
            >
              Tên Z-A
            </li>
          </ul>
        </div>
      </h3>
    </div>
  );
}

export default SortControlComponent;
