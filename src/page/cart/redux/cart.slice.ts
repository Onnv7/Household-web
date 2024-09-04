import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  clearAllItemCart,
  getExistedItemCart,
  removeItemCartFromList,
} from '../../../domain/usecase/cart.usecase';
import {
  modifyItemCartLocalStorage,
  updateItemCartLocalStorage,
} from '../../../domain/usecase/cart.usecase';
import {
  CustomerOrderInfoEntity,
  ItemCartEntity,
  ItemCartStorageEntity,
} from '../../../domain/entity/cart.entity';
import cartRepository from '../../../data/repository/cart/cart.index';
import productRepository from '../../../data/repository/product';
import { ProductDetailsEntity } from '../../../domain/entity/product.entity';
import { OrderType } from '../../../common/enum/enum';

type CartStateType = {
  itemList: ItemCartEntity[];
  receiver: CustomerOrderInfoEntity;
};
const initLocation = {
  id: '',
  name: '',
};
const initialState: CartStateType = {
  itemList: [],
  receiver: {
    orderType: OrderType.DELIVERY,
    name: '',
    phoneNumber: '',
    province: initLocation,
    district: initLocation,
    ward: initLocation,
    details: '',
    note: '',
  },
};

export const getItemCartListThunk = createAsyncThunk(
  'cart/get-items-info',
  async (_, thunkAPI) => {
    try {
      const items: ItemCartStorageEntity[] = cartRepository.getItemCartList();

      let data: ItemCartEntity[] = [];
      const fetchItemInfo = async (item: ItemCartStorageEntity) => {
        const product: ProductDetailsEntity =
          await productRepository.getProductDetails(item.productId);

        const itemInfo: ItemCartEntity = {
          productId: product.id,
          skuId: item.skuId,
          imageUrl: product.productImageList[0],
          price:
            product.productSKUList.length > 0
              ? product.productSKUList.find((sku) => sku.id === item.skuId)!
                  .price
              : product.price,
          productName: product.name,
          skuName: product.productSKUList.find((sku) => sku.id === item.skuId)
            ?.name,
          quantity: item.quantity,
          isSelected: false,
        };
        data.push(itemInfo);
      };
      await Promise.all(items.map((it) => fetchItemInfo(it)));

      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue('Loading failed');
    }
  },
);

const cartSlice = createSlice({
  name: 'cart',
  initialState: initialState,
  reducers: {
    modifyItemCartAction: (
      state,
      action: PayloadAction<ItemCartStorageEntity>,
    ) => {
      const payload = action.payload;

      const existingItem = getExistedItemCart(
        state.itemList,
        payload.productId,
        payload.skuId,
      );

      if (existingItem) {
        existingItem.quantity += action.payload.quantity;
        if (existingItem.quantity < 1) {
          state.itemList = removeItemCartFromList(
            state.itemList,
            payload.productId,
            payload.skuId,
          );
        }
      }

      modifyItemCartLocalStorage(
        payload.productId,
        payload.quantity,
        payload.skuId,
      );
    },
    updateItemCartQuantityAction: (
      state,
      action: PayloadAction<ItemCartStorageEntity>,
    ) => {
      const payload = action.payload;

      const existingItem = getExistedItemCart(
        state.itemList,
        payload.productId,
        payload.skuId,
      );

      if (existingItem) {
        existingItem.quantity = action.payload.quantity;
        if (existingItem.quantity < 1) {
          state.itemList = removeItemCartFromList(
            state.itemList,
            payload.productId,
            payload.skuId,
          );
        }
      }

      updateItemCartLocalStorage(
        payload.productId,
        payload.quantity,
        payload.skuId,
      );
    },
    clearItemCartAction: (
      state,
      action: PayloadAction<{ productId: number; skuId: number }>,
    ) => {
      const payload = action.payload;
      state.itemList = removeItemCartFromList(
        state.itemList,
        payload.productId,
        payload.skuId,
      );
    },
    clearAllItemCartAction: (state) => {
      state.itemList = [];
      clearAllItemCart();
    },
    selectItemCartAction: (
      state,
      action: PayloadAction<{
        productId: number;
        isChecked: boolean;
        skuId?: number;
      }>,
    ) => {
      const payload = action.payload;
      const existingItem = getExistedItemCart(
        state.itemList,
        payload.productId,
        payload.skuId,
      );
      if (existingItem) {
        existingItem.isSelected = action.payload.isChecked;
      }
    },

    changeAllItemCartAction: (state, action: PayloadAction<boolean>) => {
      state.itemList = state.itemList.map((item) => {
        return { ...item, isSelected: action.payload };
      });
    },
    noteItemCartAction: (
      state,
      action: PayloadAction<{
        productId: number;
        note: string;
        skuId?: number;
      }>,
    ) => {
      const payload = action.payload;
      const existingItem = getExistedItemCart(
        state.itemList,
        payload.productId,
        payload.skuId,
      );
      if (existingItem) {
        existingItem.note = action.payload.note;
      }
    },

    updateCustomerAddressInfoAction: (
      state,
      action: PayloadAction<Partial<CustomerOrderInfoEntity>>,
    ) => {
      if (
        action.payload.province &&
        state.receiver.province !== action.payload.province
      ) {
        state.receiver.district = initLocation;
        state.receiver.ward = initLocation;
      } else if (
        action.payload.district &&
        state.receiver.district !== action.payload.district
      ) {
        state.receiver.ward = initLocation;
      }

      Object.assign(state.receiver, action.payload);
    },
    submitOrderAction: (state) => {
      const customer = state.receiver;
      // if (!checkInputNotEmpty(customer.name)) {
      //   state.hasError!.customerName = true;
      // }
      state.receiver = { ...Object.assign({}, customer) };
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getItemCartListThunk.fulfilled, (state, action) => {
      state.itemList = [];
      state.itemList = action.payload;
    });
  },
});

export const {
  modifyItemCartAction,
  updateItemCartQuantityAction,
  selectItemCartAction,
  changeAllItemCartAction,
  clearAllItemCartAction,
  noteItemCartAction,
  updateCustomerAddressInfoAction,
  submitOrderAction,
} = cartSlice.actions;
export default cartSlice.reducer;
