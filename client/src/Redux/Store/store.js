import { configureStore } from "@reduxjs/toolkit";
import dogsReducer from "../Reducer/dogsReducer";


export const store = configureStore({
    reducer: {
        dogsReducer: dogsReducer
    }
})
