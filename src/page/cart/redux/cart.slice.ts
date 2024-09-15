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
  DeliveryOrderInfoEntity,
  ItemCartEntity,
  ItemCartStorageEntity,
} from '../../../domain/entity/cart.entity';
import cartRepository from '../../../data/repository/cart/cart.index';
import productRepository from '../../../data/repository/product';
import { ProductDetailsEntity } from '../../../domain/entity/product.entity';
import { OrderType } from '../../../common/enum/enum';
import { CartLocalStorage } from '../../../data/local/cart.localstorage';

type CartStateType = {
  itemList: ItemCartEntity[];
};
const initLocation = {
  id: '',
  name: '',
};
const initialState: CartStateType = {
  itemList: [],
};

export const getItemCartListThunk = createAsyncThunk(
  'cart/get-items-info',
  async (_, thunkAPI) => {
    console.log('sos');
    try {
      const items: ItemCartStorageEntity[] = cartRepository.getItemCartList();

      let data: ItemCartEntity[] = [];
      const fetchItemInfo = async (item: ItemCartStorageEntity) => {
        const product: ProductDetailsEntity =
          await productRepository.getProductDetails(item.productId);
        const sku = product.productSKUList.find((sku) => {
          return sku.id === item.skuId;
        });
        console.log('🚀 ~ fetchItemInfo ~ sku:', sku);
        if (product.productSKUList.length > 0 && !sku) {
          cartRepository.removeProduct(item.productId, item.skuId);
          return;
        }
        const itemInfo: ItemCartEntity = {
          productId: product.id,
          skuId: item.skuId,
          imageUrl: product.productImageList[0],
          price: sku ? sku.price : product.price,
          productName: product.name,
          skuName: product.productSKUList.find((sku) => sku.id === item.skuId)
            ?.name,
          quantity: item.quantity,
          isSelected: false,
        };
        console.log('🚀 ~ fetchItemInfo ~ itemInfo:', product);
        data.push(itemInfo);
      };
      await Promise.all(items.map((it) => fetchItemInfo(it)));

      return data;
    } catch (error) {
      console.log('🚀 ~ error:', error);
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
} = cartSlice.actions;
export default cartSlice.reducer;
