import { createAsyncThunk } from "@reduxjs/toolkit";
import AxiosInstance from "../helper/AxiosInstance";


export const getAllProducts = createAsyncThunk(
    "product/getAllProducts",
    async (data, {rejectWithValue}) => {
        try {
            const response = await AxiosInstance().get(`/products`);
            const result = response.data;
            return result;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const checkoutCart = createAsyncThunk(
    "cart/checkout",
    async (data, {rejectWithValue}) => {
        try {
            const response = await AxiosInstance().post(`/carts`);
            const result = response.data;
            return result;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
)
