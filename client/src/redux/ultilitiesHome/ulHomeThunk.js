import {  createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../api/api';

export const fetchUlHomes = createAsyncThunk(
    'fetch/UlHomes',
    async (data,{rejectWithValue}) => {
        try {
          const response = await api.get("/api/ulHome", data)
          return response.data
        } catch (err) {
          return rejectWithValue(err.message);
        }
      }
  );



  export const postUlHome= createAsyncThunk(
    'post/UlHome',
    async (data,{rejectWithValue}) => {
        try {
            const config = {
                headers: {
                  "Content-Type": "multipart/form-data",
                },
              };
          const response = await api.post(`/api/ulHome`,data,config)
          return response.data
        } catch (err) {
          return rejectWithValue(err.message);
        }
      }
  );

  export const deleteUlHome= createAsyncThunk(
    'delte/UlHome',
    async (data,{rejectWithValue}) => {
        try {
          const response = await api.put(`/api/ulHome/${data.id}`,data)
          return response.data
        } catch (err) {
          return rejectWithValue(err.message);
        }
      }
  );
