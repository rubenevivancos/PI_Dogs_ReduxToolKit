import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    listDogs: [],
    successMsg: "",
    errorMsg: ""
}

export const dogsReducer = createSlice({
    name: "dogsReducer",
    initialState,
    reducers:{
        gettingListDogs: (state, action) => {
            console.log("Listado de perritos --> " + action.payload.length);
            state.listDogs = action.payload;
            console.log("state.listDogs --> " + state.listDogs.length);
            console.log("state.listDogs[0] --> " + state.listDogs[0]);
        },
        successMsg: (state, action) => {
            state.successMsg = action.payload
        },
        errorMsg: (state, action) => {
            state.errorMsg = action.payload
        }
    }
})

export const {
    gettingListDogs, 
    successMsg, 
    errorMsg
} = dogsReducer.actions;

export default dogsReducer.reducer