import { configureStore } from '@reduxjs/toolkit'
import logger from 'redux-logger'
import storage from 'redux-persist/lib/storage'
import { persistReducer } from 'redux-persist'
import { combineReducers } from "redux";
import { persistStore } from "redux-persist";
import departSlice from './depart/departSlice';
import formSlice from './form/formSlice';
import serviceSile from './service/serviceSlice';
import ulDepartSlice from './ultilitiesDepart/ulDepartSlice';
import  ulHomeSlice  from './ultilitiesHome/ulHomeSlice';
import authSlice from './auth/authSlice';
const rootReducer = combineReducers({
    departSlice,
    formSlice,
    serviceSile,
    ulDepartSlice,
    ulHomeSlice,
    authSlice
    
    
});


const persistConfig = {
  key: 'root',
  storage,
  // whitelist: [""],

};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer:persistedReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
      serializableCheck: false,
    }).concat(logger),

})

export const persistor = persistStore(store);
