import { createSlice } from "@reduxjs/toolkit";

import { ITEMS_BY_PAGE } from "../../Utils/constants";


const initialState = {
    listDogsCopy: [],
    listDogs: [],
    listTemperaments: [],
    dogDetail: null,
    currentPage: 1,
    totalDogs: 0,
    itemsByPage: ITEMS_BY_PAGE,
    error: "",
    success: "" 
}

export const dogsReducer = createSlice({
    name: "dogsReducer",
    initialState,
    reducers:{
        gettingListDogs: (state, action) => {
            state.listDogs = action.payload;
            state.totalDogs = action.payload.length;
            state.listDogsCopy = action.payload;
            state.success = "";
            state.error = "";
            state.currentPage = 1;
            state.dogDetail = null
        },
        successMsg: (state, action) => {
            state.success = action.payload
        },
        errorMsg: (state, action) => {
            state.error = action.payload
        },
        setFirstPage: (state, action) => {
            state.currentPage = 1
        },
        setPrevNextPage: (state, action) => {
            let valor = action.payload;

            if((state.currentPage+valor) < 1){ 
                valor = 0;
            };
            if((state.currentPage+valor) > Math.ceil(state.totalDogs/state.itemsByPage)){
                valor = 0;
            };

            state.currentPage = state.currentPage + valor;
        },
        setLastPage: (state, action) => {
            state.currentPage = (state.totalDogs === 0) ? 1 : Math.ceil(state.totalDogs/state.itemsByPage);
        }
    }
})

export const {
    gettingListDogs, 
    successMsg, 
    errorMsg,
    setFirstPage,
    setPrevNextPage,
    setLastPage
} = dogsReducer.actions;

export default dogsReducer.reducer