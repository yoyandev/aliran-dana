import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const URL = 'http://localhost:3000/api/transactions';

export const listTransactions = createAsyncThunk('transaction/listTransactions', async (data, thunkAPI) => {
    try {
        const response = await axios({
            method: 'GET',
            url: `${URL}/search?date=${data}`
        })
        return response.data;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.message)
    }
})

export const createTransactions = createAsyncThunk('transaction/createTransactions', async (data, thunkAPI) => {
    try {
        const response = await axios({
            method: 'POST',
            url: `${URL}`,
            data
        })
        if (!response.data.metaData.status) throw new Error(response.data.metaData.message);
        thunkAPI.dispatch(listTransactions())
        return response.data;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.message)
    }
})

export const transferTransactions = createAsyncThunk('transaction/transferTransaction', async (data, thunkAPI) => {
    try {
        const sendBalanceBody = {
            transaction_note: `Mengirim saldo`,
            transaction_amount: data.transaction_amount + data.admin_fee,
            transaction_type: "expense",
            transaction_date: data.transaction_date,
            user_id: data.user_id,
            category_id: 1,
            account_id: data.from_account
        }

        const receiveBalanceBody = {
            transaction_note: `Menerima saldo`,
            transaction_amount: data.transaction_amount + data.admin_fee,
            transaction_type: "income",
            transaction_date: data.transaction_date,
            user_id: data.user_id,
            category_id: 2,
            account_id: data.to_account
        }

        await axios({
            method: 'POST',
            url: `${URL}`,
            data: sendBalanceBody
        })

        const responseReceiveBalance = await axios({
            method: 'POST',
            url: `${URL}`,
            data: receiveBalanceBody
        })

        if (!responseReceiveBalance.data.metaData.status) throw new Error(responseReceiveBalance.data.metaData.message);
        thunkAPI.dispatch(listTransactions())
        return responseReceiveBalance.data;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.message)
    }
})