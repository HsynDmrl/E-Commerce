import { combineReducers, configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice';
import categoryReducer from './categorySlice';
import productReducer from './productSlice';
import basketReducer from './basketSlice';
import purchaseReducer from './purchaseSlice';
import orderReducer from './orderSlice';
import historyReducer from './historySlice';
import favoriteReducer from './favoriteSlice';

const rootReducer = combineReducers({
  user: userReducer,
  category: categoryReducer,
  product: productReducer,
  basket: basketReducer,
  purchase: purchaseReducer,
  order: orderReducer,
  history: historyReducer,
  favorite: favoriteReducer,
});

export const store = configureStore({
  reducer: rootReducer,
});
