import { createAsyncThunk } from "@reduxjs/toolkit";
import AxiosInstance from "../helper/AxiosInstance";

export const login = createAsyncThunk(
    "user/login",
    async (data, {rejectWithValue}) => {
        try {
            const response = await AxiosInstance().post(`/users/login`, data);
            const result = response.data;
            return result;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);