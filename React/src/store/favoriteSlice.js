import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import favoriteService from '../service/favoriteService';

const initialState = {
    favorites: [],
    allFavorites: [],
    error: null,
};

export const fetchFavoritesByUser = createAsyncThunk(
    'favorite/fetchFavoritesByUser',
    async (userId, { rejectWithValue }) => {
        try {
            const response = await favoriteService.getFavoritesByUser(userId);
            return response.data;
        } catch (error) {
            return rejectWithValue(error);
        }
    }
);

export const fetchAllFavorites = createAsyncThunk(
    'favorite/fetchAllFavorites',
    async (_, { rejectWithValue }) => {
        try {
            const response = await favoriteService.getAllFavorites();
            return response.data;
        } catch (error) {
            return rejectWithValue(error);
        }
    }
);

export const addFavorite = createAsyncThunk(
    'favorite/addFavorite',
    async ({ userId, productId }, { rejectWithValue }) => {
        try {
            await favoriteService.addFavorite(userId, productId);
            return { productId };
        } catch (error) {
            return rejectWithValue(error);
        }
    }
);

export const removeFavorite = createAsyncThunk(
    'favorite/removeFavorite',
    async ({ userId, productId }, { rejectWithValue }) => {
        try {
            await favoriteService.removeFavorite(userId, productId);
            return { productId };
        } catch (error) {
            return rejectWithValue(error);
        }
    }
);

const favoriteSlice = createSlice({
    name: 'favorite',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchFavoritesByUser.pending, (state) => {
                state.error = null;
            })
            .addCase(fetchFavoritesByUser.fulfilled, (state, action) => {
                state.favorites = action.payload || [];
            })
            .addCase(fetchFavoritesByUser.rejected, (state, action) => {
                state.error = action.payload?.message || action.error.message;
            })
            .addCase(fetchAllFavorites.fulfilled, (state, action) => {
                state.allFavorites = action.payload || [];
            })
            .addCase(addFavorite.fulfilled, (state, action) => {
                state.favorites.push({ product_id: action.payload.productId });
            })
            .addCase(removeFavorite.fulfilled, (state, action) => {
                state.favorites = state.favorites.filter(favorite => favorite.product_id !== action.payload.productId);
            });
    },
});

export default favoriteSlice.reducer;
