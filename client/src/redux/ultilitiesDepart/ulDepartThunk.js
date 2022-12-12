import {  createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../api/api';

export const fetchUlDeparts = createAsyncThunk(
    'fetch/UlDeparts',
    async (data,{rejectWithValue}) => {
        try {
          const response = await api.get("/api/ulDepart", data)
          return response.data
        } catch (err) {
          return rejectWithValue(err.message);
        }
      }
  );



  export const postUlDepart= createAsyncThunk(
    'post/UlDepart',
    async (data,{rejectWithValue}) => {
        try {
            const config = {
                headers: {
                  "Content-Type": "multipart/form-data",
                },
              };
          const response = await api.post(`/api/ulDepart`,data,config)
          return response.data
        } catch (err) {
          return rejectWithValue(err.message);
        }
      }
  );

  export const deleteUlDepart= createAsyncThunk(
    'delte/UlDepart',
    async (data,{rejectWithValue}) => {
        try {
          const response = await api.put(`/api/ulDepart/${data.id}`,data)
          return response.data
        } catch (err) {
          return rejectWithValue(err.message);
        }
      }
  );
