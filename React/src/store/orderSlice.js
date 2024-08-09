import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import orderService from '../service/orderService';

const initialState = {
    orders: [],
    orderDetails: [],
    error: null,
};

export const fetchOrderList = createAsyncThunk(
    'order/fetchOrderList',
    async (userId, { rejectWithValue }) => {
        try {
            const response = await orderService.getOrderList(userId);
            return response.data;
        } catch (error) {
            return rejectWithValue(error);
        }
    }
);

export const fetchOrderDetailList = createAsyncThunk(
    'order/fetchOrderDetailList',
    async (orderId, { rejectWithValue }) => {
        try {
            const response = await orderService.getOrderDetailList(orderId);
            return response.data;
        } catch (error) {
            return rejectWithValue(error);
        }
    }
);

export const orderSlice = createSlice({
    name: 'order',
    initialState,
    reducers: {
        clearError: (state) => {
            state.error = null;
        },
        clearOrderDetails: (state) => {
            state.orderDetails = [];
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchOrderList.pending, (state) => {
                state.error = null;
            })
            .addCase(fetchOrderList.fulfilled, (state, action) => {
                state.orders = action.payload;
            })
            .addCase(fetchOrderList.rejected, (state, action) => {
                state.error = action.payload || action.error.message;
            })
            .addCase(fetchOrderDetailList.pending, (state) => {
                state.error = null;
            })
            .addCase(fetchOrderDetailList.fulfilled, (state, action) => {
                state.orderDetails = action.payload;
            })
            .addCase(fetchOrderDetailList.rejected, (state, action) => {
                state.error = action.payload || action.error.message;
            });
    },
});

export const { clearError, clearOrderDetails } = orderSlice.actions;
export default orderSlice.reducer;
