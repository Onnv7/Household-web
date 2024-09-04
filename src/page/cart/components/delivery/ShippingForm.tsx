import { ChangeEvent, useEffect, useState } from 'react';
import DeliveryTextInput from './DeliveryTextInput';
import ARROW_DOWN_ICON from '../../../../assets/icon/arrow_down_icon.svg';
import AddressModal from './AddressModal';
import {
  getDistrictList,
  getProvinceList,
  getWardList,
} from '../../../../domain/usecase/cart.usecase';
import {
  LocationEntity,
  ProvinceEntity,
} from '../../../../domain/entity/address.entity';
import { useSelector } from 'react-redux';
import { cartSelector } from '../../../../store/selectors';
import { useAppDispatch } from '../../../../store/store';
import { updateCustomerAddressInfoAction } from '../../redux/cart.slice';
import { checkInputNotEmpty } from '../../../../common/ultils/check.ultil';
import { OrderType } from '../../../../common/enum/enum';

function ShippingForm() {
  const cartPayload = useSelector(cartSelector);
  const dispatch = useAppDispatch();

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
        dispatch(updateCustomerAddressInfoAction({ province: data }));
      };

      dataList = () => getProvinceListData();
    } else if (openModal.district) {
      title = 'Quận/Huyện';
      onClose = () =>
        setOpenModal((prev) => {
          return { ...prev, district: false };
        });
      onChoose = (data: any) => {
        dispatch(updateCustomerAddressInfoAction({ district: data }));
      };
      dataList = async () =>
        getDistrictList(cartPayload.receiver.province?.id!);
    } else if (openModal.ward) {
      title = 'Phường/Xã';
      onClose = () =>
        setOpenModal((prev) => {
          return { ...prev, ward: false };
        });
      onChoose = (data: any) => {
        dispatch(updateCustomerAddressInfoAction({ ward: data }));
      };
      dataList = async () =>
        getWardList(
          cartPayload.receiver.province?.id!,
          cartPayload.receiver.district?.id!,
        );
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
      <DeliveryTextInput
        name="province"
        placeHolder="Tỉnh/Thành phố"
        required
        suffixIcon={ARROW_DOWN_ICON}
        onClickSuffixIcon={() =>
          setOpenModal((prev) => {
            return { ...prev, province: true };
          })
        }
        value={cartPayload.receiver.province?.name!}
        onCheckTextInput={(text) => {
          return cartPayload.receiver.orderType === OrderType.TAKE_AWAY
            ? true
            : checkInputNotEmpty(cartPayload.receiver.province?.name!);
        }}
        errorText="Không được để trống"
      />
      <DeliveryTextInput
        name="district"
        placeHolder="Quận/Huyện"
        required
        suffixIcon={ARROW_DOWN_ICON}
        onClickSuffixIcon={() =>
          setOpenModal((prev) => {
            return { ...prev, district: true };
          })
        }
        value={cartPayload.receiver.district?.name}
        onCheckTextInput={(text) => {
          return cartPayload.receiver.orderType === OrderType.TAKE_AWAY
            ? true
            : checkInputNotEmpty(cartPayload.receiver.district?.name);
        }}
        errorText="Không được để trống"
      />
      <DeliveryTextInput
        name="ward"
        placeHolder="Phường/Xã"
        required
        suffixIcon={ARROW_DOWN_ICON}
        onClickSuffixIcon={() =>
          setOpenModal((prev) => {
            return { ...prev, ward: true };
          })
        }
        value={cartPayload.receiver.ward?.name}
        onCheckTextInput={(text) => {
          return cartPayload.receiver.orderType === OrderType.TAKE_AWAY
            ? true
            : checkInputNotEmpty(cartPayload.receiver.ward?.name);
        }}
        errorText="Không được để trống"
      />
      <DeliveryTextInput
        name="details"
        placeHolder="Địa chỉ nhận hàng"
        required
        value={cartPayload.receiver.details}
        onChange={(e) =>
          dispatch(updateCustomerAddressInfoAction({ details: e.target.value }))
        }
        onCheckTextInput={(text) => {
          return cartPayload.receiver.orderType === OrderType.TAKE_AWAY
            ? true
            : checkInputNotEmpty(cartPayload.receiver.details);
        }}
        errorText="Không được để trống"
      />
      {modal()}
    </>
  );
}

export default ShippingForm;
