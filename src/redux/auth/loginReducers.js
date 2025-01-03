import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
// import { setDialogOpen } from '../menu/menuSlice';
import { config } from '../../utils/config';

const { apiUrl } = config();
const URL = `${apiUrl}/api/users`;

export const authLogin = createAsyncThunk('auth/authLogin', async (data, thunkAPI) => {
    console.log('authLogin : ', data);    
    try {
        const response = await axios({
            method: 'POST',
            url: `${URL}/login`,
            data
        })
        if (!response.data.metaData.status) throw new Error(response.data.metaData.message);
        return response.data;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data.metaData.message || error.message);
    }
});