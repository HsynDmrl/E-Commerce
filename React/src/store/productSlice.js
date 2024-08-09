import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import productService from "../service/productService";

const initialState = {
    products: [],
    product: {},
    price: 0,
    error: null
};

export const fetchProducts = createAsyncThunk(
    'product/filterAndSort',
    async (filterData, { rejectWithValue }) => {
        try {
            const response = await productService.filterAndSort(filterData);
            return response.data;
        } catch (error) {
            return rejectWithValue(error);
        }
    }
);

const productSlice = createSlice({
    name: 'product',
    initialState,
    reducers: {
        setProducts: (state, action) => {
            state.products = action.payload;
        },
        setProduct: (state, action) => {
            state.product = action.payload;
        },
        setPrice: (state, action) => {
            state.price = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchProducts.fulfilled, (state, action) => {
                state.products = action.payload;
            })
            .addCase(fetchProducts.rejected, (state, action) => {
                state.error = action.payload || action.error.message;
            });
    }
});

export const { setProducts, setProduct, setPrice } = productSlice.actions;
export default productSlice.reducer;
