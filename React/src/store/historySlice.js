import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import historyService from '../service/historyService';

const initialState = {
    csvData: null,
    error: null,
    message: null,
};

export const generateHistoryCSV = createAsyncThunk(
    'history/generateHistoryCSV',
    async (userId, { rejectWithValue }) => {
        try {
            const response = await historyService.generateHistoryCSV(userId);
            return response;
        } catch (error) {
            return rejectWithValue(error);
        }
    }
);

export const getPurchaseHistoryByUser = createAsyncThunk(
    'history/getPurchaseHistoryByUser',
    async (userId, { rejectWithValue }) => {
        try {
            const response = await historyService.getPurchaseHistoryByUser(userId);
            return response;
        } catch (error) {
            return rejectWithValue(error);
        }
    }
);

export const historySlice = createSlice({
    name: 'history',
    initialState,
    reducers: {
        clearError: (state) => {
            state.error = null;
        },
        clearMessage: (state) => {
            state.message = null;
        },
        clearCsvData: (state) => {
            state.csvData = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(generateHistoryCSV.pending, (state) => {
                state.error = null;
            })
            .addCase(generateHistoryCSV.fulfilled, (state, action) => {
                state.message = action.payload.message;
            })
            .addCase(generateHistoryCSV.rejected, (state, action) => {
                state.error = action.payload.message || action.error.message;
            })
            .addCase(getPurchaseHistoryByUser.fulfilled, (state, action) => {
                state.csvData = action.payload;
            })
            .addCase(getPurchaseHistoryByUser.rejected, (state, action) => {
                state.error = action.payload.message || action.error.message;
            });
    },
});

export const { clearError, clearMessage, clearCsvData } = historySlice.actions;
export default historySlice.reducer;
