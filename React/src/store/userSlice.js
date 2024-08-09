import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import userService from '../service/userService';

const initialState = {
    userId: null,
    username: null,
    isLoggedIn: false,
    error: null,
    message: null,
    isLoading: false,
};

export const login = createAsyncThunk(
    'user/login',
    async ({ username, password }, { rejectWithValue }) => {
        try {
            const response = await userService.login(username, password);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        logout: (state) => {
            state.isLoggedIn = false;
            state.userId = null;
            state.username = null;
            state.message = null;
            state.error = null;
        },
        clearError: (state) => {
            state.error = null;
        },
        clearMessage: (state) => {
            state.message = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(login.pending, (state) => {
                state.isLoading = true;
                state.error = null;
                state.message = null;
            })
            .addCase(login.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isLoggedIn = true;
                state.userId = action.payload.userId;
                state.username = action.payload.username;
                state.message = action.payload.message;
            })
            .addCase(login.rejected, (state, action) => {
                state.isLoading = false;
                state.isLoggedIn = false;
                state.error = action.payload;
                state.message = null;
            });
    }
});

export const { logout, clearError, clearMessage } = userSlice.actions;
export default userSlice.reducer;
