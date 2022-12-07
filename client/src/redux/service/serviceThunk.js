import {  createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../api/api';

export const fetchServices = createAsyncThunk(
    'fetch/services',
    async (data,{rejectWithValue}) => {
        try {
          const response = await api.get("/api/service", data)
          return response.data
        } catch (err) {
          return rejectWithValue(err.message);
        }
      }
  );



  export const postService= createAsyncThunk(
    'post/service',
    async (data,{rejectWithValue}) => {
        try {
            const config = {
                headers: {
                  "Content-Type": "multipart/form-data",
                },
              };
          const response = await api.post(`/api/service`,data,config)
          return response.data
        } catch (err) {
          return rejectWithValue(err.message);
        }
      }
  );

  export const deleteService= createAsyncThunk(
    'delte/service',
    async (data,{rejectWithValue}) => {
        try {
          const response = await api.put(`/api/service/${data.id}`,data)
          return response.data
        } catch (err) {
          return rejectWithValue(err.message);
        }
      }
  );
