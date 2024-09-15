import AppRadio from '../../../common/components/AppRadio';
import { useForm } from 'react-hook-form';
import EMAIL_ICON from '@src/assets/icon/email_fullfil_icon.png';
import PERSON_ICON from '@src/assets/icon/person_fullfil_icon.png';
import PHONE_ICON from '@src/assets/icon/phone_fullfil_icon.png';
import AppInputText2 from '../../../common/components/AppInputText2';
import { useAuthContext } from '../../../context/auth.context';
import { useEffect, useState } from 'react';
import {
  getUserProfile,
  updateUserProfile,
} from '../../../domain/usecase/account.usecase';
import { UserProfileEntity } from '../../../domain/entity/user.entity';
import { Gender } from '../../../common/enum/enum';
import { zodResolver } from '@hookform/resolvers/zod';
import { profileSchema } from '../../../common/zod/account.zod';
import { DevTool } from '@hookform/devtools';
import { toastNotification } from '../../../common/ultils/notification.ulti';

function EditProfileComponent() {
  const form = useForm<UserProfileEntity>({
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      gender: Gender.MALE,
    },
    resolver: zodResolver(profileSchema),
    mode: 'onChange',
  });

  const { register, setValue, control, formState, getValues, handleSubmit } =
    form;
  const { errors } = formState;
  const { userId } = useAuthContext();
  useEffect(() => {
    const fetchData = async () => {
      const data = await getUserProfile(userId!);
      setValue('firstName', data.firstName);
      setValue('lastName', data.lastName);
      setValue('gender', data.gender);
      setValue('email', data.email);
    };
    fetchData();
  }, []);
  async function handleOnSubmit(data: UserProfileEntity) {
    try {
      await updateUserProfile(userId!, data);
      toastNotification({ msg: 'Cập nhật thành công' });
    } catch (err) {
      console.log(err);
    }
  }
  return (
    <div className="p-2">
      <h1 className="text-[1.8rem] font-[500]">Thông tin tài khoản</h1>
      <form
        className="flex flex-col gap-2 px-16 mt-4"
        onSubmit={handleSubmit(handleOnSubmit)}
      >
        <span className="flex flex-row gap-2">
          <div className="w-full">
            <p>Họ</p>
            <AppInputText2
              placeHolder="Họ"
              icon_path={PERSON_ICON}
              register={register('lastName')}
              errorText={errors.lastName?.message}
            />
          </div>
          <div className="w-full">
            <p>Tên</p>
            <AppInputText2
              placeHolder="Tên"
              icon_path={PERSON_ICON}
              register={register('firstName')}
              errorText={errors.firstName?.message}
            />
          </div>
        </span>
        <div className="w-full">
          <p>Email</p>
          <AppInputText2
            placeHolder="Email"
            icon_path={EMAIL_ICON}
            disabled={true}
            register={register('email')}
          />
        </div>
        <div className="flex items-center gap-2 mt-1">
          <h5>Giới tính</h5>
          <div className="flex gap-4 rounded-sm border-[1px] border-gray-200 px-2 py-1">
            <AppRadio
              register={register('gender')}
              label="Nam"
              value={Gender.MALE}
              defaultChecked={
                getValues('gender') === Gender.MALE ? true : false
              }
            />
            <AppRadio
              register={register('gender')}
              label="Nữ"
              name="gender"
              value={Gender.FEMALE}
              defaultChecked={
                getValues('gender') === Gender.FEMALE ? true : false
              }
            />
          </div>
        </div>
        <button
          className="mt-8 rounded-md bg-primary-2 py-2 text-[1.2rem] font-[500] text-white"
          type="submit"
        >
          Cập nhật
        </button>
      </form>
      <DevTool control={control} />
    </div>
  );
}

export default EditProfileComponent;
