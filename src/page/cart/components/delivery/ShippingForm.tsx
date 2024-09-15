import { useEffect, useState } from 'react';
import ARROW_DOWN_ICON from '../../../../assets/icon/arrow_down_icon.svg';
import AddressModal from './AddressModal';
import {
  getDistrictList,
  getProvinceList,
  getWardList,
} from '../../../../domain/usecase/cart.usecase';
import {
  AddressChosenEntity,
  LocationEntity,
} from '../../../../domain/entity/address.entity';
import { UseFormReturn } from 'react-hook-form';
import AppInputText from '../../../../common/components/AppInputText';
import { DeliveryOrderInfoEntity } from '../../../../domain/entity/cart.entity';
type ShippingFormProps = {
  form: UseFormReturn<DeliveryOrderInfoEntity, any, undefined>;
};
function ShippingForm({ form }: ShippingFormProps) {
  const { register, formState, getValues, setValue } = form;
  const [addressId, setAddressId] = useState<AddressChosenEntity>();
  const { errors } = formState;
  const [openModal, setOpenModal] = useState({
    province: false,
    district: false,
    ward: false,
  });

  useEffect(() => {
    if (openModal.district || openModal.province || openModal.ward) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [openModal]);

  const getProvinceListData = async () => {
    return await getProvinceList();
  };

  const modal = () => {
    let onClose;
    let onChoose: ({ name, id }: LocationEntity) => void;
    let dataList;
    let title;
    if (openModal.province) {
      title = 'Tỉnh/Thành phố';
      onClose = () =>
        setOpenModal((prev) => {
          return { ...prev, province: false };
        });
      onChoose = (data) => {
        setValue('province', data.name);
        setValue('district', '');
        setValue('ward', '');
        setAddressId((prev) => {
          return {
            ...prev,
            provinceId: data.id,
          };
        });
      };

      dataList = () => getProvinceListData();
    } else if (openModal.district) {
      title = 'Quận/Huyện';
      onClose = () =>
        setOpenModal((prev) => {
          return { ...prev, district: false };
        });
      onChoose = (data: any) => {
        setValue('district', data.name);
        setValue('ward', '');
        setAddressId((prev) => {
          return {
            ...prev,
            districtId: data.id,
          };
        });
      };
      dataList = async () => getDistrictList(addressId?.provinceId!);
    } else if (openModal.ward) {
      title = 'Phường/Xã';
      onClose = () =>
        setOpenModal((prev) => {
          return { ...prev, ward: false };
        });
      onChoose = (data: any) => {
        setValue('ward', data.name);
        setAddressId((prev) => {
          return {
            ...prev,
            wardId: data.id,
          };
        });
      };
      dataList = async () =>
        getWardList(addressId?.provinceId!, addressId?.districtId!);
    } else {
      return <></>;
    }
    return (
      <AddressModal
        onClose={onClose}
        onChoose={onChoose}
        dataList={dataList!}
        title={title}
      />
    );
  };

  return (
    <>
      <AppInputText
        disabled={true}
        register={register('province')}
        placeHolder="Tỉnh/Thành phố"
        required
        suffixIcon={ARROW_DOWN_ICON}
        onClickSuffixIcon={() =>
          setOpenModal((prev) => {
            return { ...prev, province: true };
          })
        }
        value={getValues('province')}
        errorText={errors.province?.message}
      />
      <AppInputText
        disabled={true}
        register={register('district')}
        placeHolder="Quận/Huyện"
        required
        suffixIcon={ARROW_DOWN_ICON}
        onClickSuffixIcon={() =>
          setOpenModal((prev) => {
            return { ...prev, district: true };
          })
        }
        value={getValues('district')}
        errorText={errors.district?.message}
      />
      <AppInputText
        disabled={true}
        register={register('ward')}
        placeHolder="Phường/Xã"
        required
        suffixIcon={ARROW_DOWN_ICON}
        onClickSuffixIcon={() =>
          setOpenModal((prev) => {
            return { ...prev, ward: true };
          })
        }
        value={getValues('ward')}
        errorText={errors.ward?.message}
      />

      <AppInputText
        register={register('details')}
        placeHolder="Địa chỉ nhận hàng"
        required
        value={getValues('details')}
        errorText={errors.details?.message}
      />

      {modal()}
    </>
  );
}

export default ShippingForm;
