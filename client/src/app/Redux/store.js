import { configureStore } from "@reduxjs/toolkit"

import { apiSlice } from "./baseApi/apiSlice"

import authSliceReducer from "../Features/Auth/authSlice"
import contactSliceReducer from "../Features/Contact/contactSlice"

const store= configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,

   
    contact:contactSliceReducer,
    auth:authSliceReducer

   
   
  },

  devTools: !process.env.NODE_ENV ==="production",

  middleware: (GetDefaultMiddleware) => GetDefaultMiddleware().concat(apiSlice.middleware),
})

export default store
