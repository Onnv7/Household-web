import React, { useEffect, useState } from 'react';
import SEARCH_ICON from '../../../../assets/icon/search_icon.svg';

import CLOSE_ICON from '../../../../assets/icon/close_icon.svg';
import {
  LocationEntity,
  ProvinceEntity,
} from '../../../../domain/entity/address.entity';

type AddressModalProps = {
  title: string;
  onClose: () => void;
  onChoose?: ({ name, id }: LocationEntity) => void;
  dataList: () => Promise<any>;
};

function AddressModal({
  title,
  onClose,
  onChoose,
  dataList,
}: AddressModalProps) {
  const [key, setKey] = useState('');
  const [searchResult, setSearchResult] = useState<any[] | undefined>(
    undefined,
  );
  const [itemList, setItemList] = useState<any[]>([]);
  useEffect(() => {
    const loadingData = async () => {
      setItemList(await dataList());
    };
    loadingData();
  }, []);
  return (
    <div
      className="fixed left-0 top-0 z-10 h-[100vh] w-[100vw] bg-black bg-opacity-40"
      onClick={() => {
        onClose();
      }}
    >
      <div
        className="absolute left-[50%] top-[50%] mx-auto h-[80%] w-[35%] -translate-x-[50%] -translate-y-[50%] rounded-md bg-white p-5"
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <div className="flex h-[100%] flex-col">
          <h1 className="mb-5 text-[20px] font-[600]">{title}</h1>
          <div className="flex h-[46px] w-[100%] items-center justify-center rounded-md bg-[#f4f4f4]">
            <img
              src={SEARCH_ICON}
              alt=""
              className="ml-2 mr-1 h-[24px] w-[24px]"
            />
            <input
              type="text"
              name=""
              id=""
              value={key}
              onChange={(e) => {
                setKey(e.target.value);
                if (e.target.value.trim() === '') {
                  setSearchResult(undefined);
                } else {
                  const filterData = itemList.filter((item) =>
                    item.name
                      .toLowerCase()
                      .includes(e.target.value.toLowerCase()),
                  );
                  setSearchResult(filterData);
                }
              }}
              placeholder="Tìm kiếm"
              className="w-[100%] bg-transparent outline-none"
            />
            {key.length > 0 && (
              <img
                src={CLOSE_ICON}
                alt=""
                className="mx-2 cursor-pointer"
                onClick={() => setKey('')}
              />
            )}
          </div>
          <ul className="my-3 overflow-y-auto">
            {searchResult
              ? searchResult.map((item) => {
                  return (
                    <li
                      className="h-[38px] w-[100%] cursor-pointer select-none content-center px-3 transition-all delay-[10000] ease-in-out hover:rounded-md hover:bg-[#f4f4f4] active:bg-green-200"
                      onClick={(e) => {
                        if (onChoose !== undefined) {
                          onChoose({ name: item.name, id: item.id });
                        }
                        onClose();
                      }}
                      key={item.id}
                    >
                      {item.name}
                    </li>
                  );
                })
              : itemList.map((item) => {
                  return (
                    <li
                      className="h-[38px] w-[100%] cursor-pointer select-none content-center px-3 transition-all delay-[10000] ease-in-out hover:rounded-md hover:bg-[#f4f4f4] active:bg-green-200"
                      onClick={(e) => {
                        if (onChoose !== undefined) {
                          onChoose({ name: item.name, id: item.id });
                        }
                        onClose();
                      }}
                      key={item.id}
                    >
                      {item.name}
                    </li>
                  );
                })}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default AddressModal;
