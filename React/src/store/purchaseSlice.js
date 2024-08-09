import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import purchaseService from '../service/purchaseService';

const initialState = {
    error: null,
    message: null,
};

export const completePurchase = createAsyncThunk(
    'purchase/completePurchase',
    async (userId, { rejectWithValue }) => {
        try {
            const response = await purchaseService.completePurchase(userId);
            return response.message;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const purchaseSlice = createSlice({
    name: 'purchase',
    initialState,
    reducers: {
        clearMessage: (state) => {
            state.message = null;
        },
        clearError: (state) => {
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(completePurchase.fulfilled, (state, action) => {
                state.message = action.payload;
                state.error = null;
            })
            .addCase(completePurchase.rejected, (state, action) => {
                state.error = action.payload || action.error.message;
                state.message = null;
            });
    },
});

export const { clearMessage, clearError } = purchaseSlice.actions;
export default purchaseSlice.reducer;
