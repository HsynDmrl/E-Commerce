import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import CategoryService from '../service/categoryService';

const initialState = {
    categories: [],
    error: null,
};

export const fetchCategories = createAsyncThunk(
    'category/getAllCategories',
    async (_, { rejectWithValue }) => {
        try {
            const response = await CategoryService.getAllCategories();
            const formattedCategories = response.data.map(category => ({
                id: category[0],
                name: category[1],
                parentId: category[2]
            }));
            return formattedCategories;
        } catch (error) {
            return rejectWithValue(error);
        }
    }
);

const categorySlice = createSlice({
    name: 'category',
    initialState,
    reducers: {
        setCategories: (state, action) => {
            state.categories = action.payload;
        },
        setError: (state, action) => {
            state.error = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchCategories.pending, (state) => {
                state.error = null;
            })
            .addCase(fetchCategories.fulfilled, (state, action) => {
                state.categories = action.payload;
            })
            .addCase(fetchCategories.rejected, (state, action) => {
                state.error = action.payload?.message || action.error.message;
            });
    }
});

export const { setCategories, setError } = categorySlice.actions;
export default categorySlice.reducer;
