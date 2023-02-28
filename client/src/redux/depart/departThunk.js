import {  createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../api/api';

export const fetchDeparts = createAsyncThunk(
    'fetch/depart',
    async (data,{rejectWithValue}) => {
        try {
          const response = await api.get("/api/depart", data)
          return response.data
        } catch (err) {
          return rejectWithValue(err.message);
        }
      }
  );


  export const fetchDepartDetail = createAsyncThunk(
    'fetch/departDetail',
    async (id,{rejectWithValue}) => {
        try {
          const response = await api.get(`/api/depart/${id}`)
          return response.data
        } catch (err) {
          return rejectWithValue(err.message);
        }
      }
  );

  export const postDepart = createAsyncThunk(
    'post/depart',
    async (data,{rejectWithValue}) => {
        try {
          const config = {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          };
          const response = await api.post(`/api/depart`,data,config)
          return response.data
        } catch (err) {
          return rejectWithValue(err.message);
        }
      }
  );

  export const updateDepart = createAsyncThunk(
    'update/depart',
    async (data,{rejectWithValue}) => {
        try {
          
          const response = await api.put(`/api/depart/${data._id}`,data)
          return response.data
        } catch (err) {
          return rejectWithValue(err.message);
        }
      }
  );
  export const updateImage = createAsyncThunk(
    'upate/departImage',
    async (data,{rejectWithValue}) => {
      console.log("data",data)
        try {
          const config = {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          };
          let formData = new FormData();
          for (let i = 0 ; i < data.photo.length ; i++) {
            formData.append("photo", data.photo[i]);
        }
          const response = await api.post(`/api/depart/image/update/${data._id}`,formData,config)
          return response.data
        } catch (err) {
          return rejectWithValue(err.message);
        }
      }
  );
  export const deleteImage = createAsyncThunk(
    'delete/departImage',
    async (data,{rejectWithValue}) => {
        try {
          const config = {
            headers: {
              "Content-Type": "application/json",
            },
          };
          const response = await api.put(`/api/depart/image/delete/${data._id}`,data,config)
          return response.data
        } catch (err) {
          return rejectWithValue(err.message);
        }
      }
  );

  export const deleteDepart = createAsyncThunk(
    'delete/depart',
    async (data,{rejectWithValue}) => {

        try {
          const config = {
            headers: {
              "Content-Type": "application/json",
            },
          };
          const response = await api.put(`/api/depart/delete/${data._id}`,data,config)
          return response.data
        } catch (err) {
          return rejectWithValue(err.message);
        }
      }
  );