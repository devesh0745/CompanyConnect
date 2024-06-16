import { companyReducer } from "./companyReducer";
import { userReducer } from "./userReducer";

import { configureStore } from "@reduxjs/toolkit";

export const store=configureStore({
    reducer:{
        companyReducer,
        userReducer
    },
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware({
          serializableCheck: false,
        })
})