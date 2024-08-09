import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import basketService from '../service/basketService';

const initialState = {
    basketItems: [],
    error: null,
    message: null,
};

export const addBasketItem = createAsyncThunk(
    'basket/addBasketItem',
    async (basketItem, { rejectWithValue }) => {
        try {
            const response = await basketService.addBasketItem(basketItem);
            return response.message;
        } catch (error) {
            return rejectWithValue(error);
        }
    }
);

export const getBasketItems = createAsyncThunk(
    'basket/getBasketItems',
    async (userId) => {
        const response = await basketService.getBasketItems(userId);
        return response.data;
    }
);


export const decreaseItemQuantity = createAsyncThunk(
    'basket/decreaseItemQuantity',
    async (basketItemId, { rejectWithValue }) => {
        try {
            const response = await basketService.decreaseItemQuantity(basketItemId);
            return { basketItemId, message: response.message };
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const increaseItemQuantity = createAsyncThunk(
    'basket/increaseItemQuantity',
    async (basketItemId, { rejectWithValue }) => {
        try {
            const response = await basketService.increaseItemQuantity(basketItemId);
            return { basketItemId, message: response.message };
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const deleteBasketItem = createAsyncThunk(
    'basket/deleteBasketItem',
    async (basketItemId, { rejectWithValue }) => {
        try {
            const response = await basketService.deleteBasketItem(basketItemId);
            return { basketItemId, message: response.message };
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const clearBasket = createAsyncThunk(
    'basket/clearBasket',
    async (userId, { rejectWithValue }) => {
        try {
            const response = await basketService.clearBasket(userId);
            return response.message;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);


export const basketSlice = createSlice({
    name: 'basket',
    initialState,
    reducers: {
        clearError: (state) => {
            state.error = null;
        },
        clearMessage: (state) => {
            state.message = null;
        },
        clearBasketItems: (state) => {
            state.basketItems = [];
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(addBasketItem.fulfilled, (state, action) => {
                state.message = action.payload;
            })
            .addCase(addBasketItem.rejected, (state, action) => {
                state.error = action.payload;
            })
            .addCase(getBasketItems.fulfilled, (state, action) => {
                state.basketItems = action.payload;
            })
            .addCase(getBasketItems.rejected, (state, action) => {
                state.error = action.payload;
            })
            .addCase(decreaseItemQuantity.fulfilled, (state, action) => {
                const index = state.basketItems.findIndex(item => item.basket_item_id === action.payload.basketItemId);
                if (index !== -1) {
                    if (state.basketItems[index].quantity === 1) {
                        state.basketItems.splice(index, 1);
                    } else {
                        state.basketItems[index].quantity -= 1;
                    }
                }
                state.message = action.payload.message;
            })
            .addCase(decreaseItemQuantity.rejected, (state, action) => {
                state.error = action.payload;
            })
            .addCase(increaseItemQuantity.fulfilled, (state, action) => {
                const index = state.basketItems.findIndex(item => item.basket_item_id === action.payload.basketItemId);
                if (index !== -1) {
                    state.basketItems[index].quantity += 1;
                }
                state.message = action.payload.message;
            })
            .addCase(increaseItemQuantity.rejected, (state, action) => {
                state.error = action.payload;
            })
            .addCase(deleteBasketItem.fulfilled, (state, action) => {
                state.basketItems = state.basketItems.filter(item => item.basket_item_id !== action.payload.basketItemId);
                state.message = action.payload.message;
            })
            .addCase(deleteBasketItem.rejected, (state, action) => {
                state.error = action.payload;
            })
            .addCase(clearBasket.fulfilled, (state, action) => {
                state.basketItems = [];
                state.message = action.payload;
            })
            .addCase(clearBasket.rejected, (state, action) => {
                state.error = action.payload;
            });
    },
});

export const { clearError, clearMessage, clearBasketItems } = basketSlice.actions;
export default basketSlice.reducer;
