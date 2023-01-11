import {  createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../api/api';

export const fetchForm = createAsyncThunk(
    'fetch/form',
    async (data,{rejectWithValue}) => {
        try {
          const response = await api.get("/api/form", data)
          return response.data
        } catch (err) {
          return rejectWithValue(err.message);
        }
      }
  );


  export const fetchFormDetail = createAsyncThunk(
    'fetch/formDetail',
    async (id,{rejectWithValue}) => {
        try {
          const response = await api.get(`/api/form/${id}`)
          return response.data
        } catch (err) {
          return rejectWithValue(err.message);
        }
      }
  );
  export const deleteForm = createAsyncThunk(
    'delete/form',
    async (id,{rejectWithValue}) => {
        try {
          console.log("id",id)
          const response = await api.delete(`/api/form/${id}`)
          return response.data
        } catch (err) {
          return rejectWithValue(err.message);
        }
      }
  );

  export const postForm = createAsyncThunk(
    'post/form',
    async (data,{rejectWithValue}) => {
        try {
          const response = await api.post(`/api/form`,data)
          return response.data
        } catch (err) {
          return rejectWithValue(err.message);
        }
      }
  );

