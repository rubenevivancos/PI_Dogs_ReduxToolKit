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
        gettingListTemperaments: (state, action) => {
            state.listTemperaments = action.payload;
        },
        gettingFilterByOriginTemperament: (state, action) => {
            let listDogs = state.listDogsCopy;
            const filters = action.payload;

            let listDogsFilter = filters.origin === "0" ? listDogs : listDogs.filter(e => e.creadoEnDB.toString() === filters.origin);
            listDogsFilter = filters.temp === "0" ? listDogsFilter : listDogsFilter.filter(e => e.temperament.includes(filters.temp));

            if(listDogsFilter.length){
                state.listDogs = listDogsFilter;
                state.currentPage = 1;
                state.totalDogs = listDogsFilter.length;
                state.error = "";
            }else{
                state.listDogs = listDogsFilter;
                state.error = "NO HAY RESULTADOS";
            }
        },
        gettingOrderByName: (state, action) => {
            let errMsg = "NO HAY RESULTADOS";

            if(action.payload === "name_asc"){
                state.listDogsCopy.sort((a, b) => a.name.localeCompare(b.name));
                if(state.listDogs.length){
                    state.listDogs.sort((a, b) => a.name.localeCompare(b.name));
                    errMsg = "";
                }
            }else{
                state.listDogsCopy.sort((a, b) => b.name.localeCompare(a.name));
                if(state.listDogs.length){
                    state.listDogs.sort((a, b) => b.name.localeCompare(a.name));
                    errMsg = "";
                }
            }
            
            state.listDogs = state.listDogs;
            state.listDogsCopy = state.listDogsCopy;
            state.currentPage = 1;
            state.error = errMsg;
        },
        gettingOrderByWeight: (state, action) => {
            let err = "NO HAY RESULTADOS";

            if(action.payload === "weight_asc"){
                state.listDogsCopy.sort((a, b) => Number(a.weight_min) - Number(b.weight_min));
                if(state.listDogs.length){
                    state.listDogs.sort((a, b) => Number(a.weight_min) - Number(b.weight_min));
                    err = "";
                }
            }else{
                state.listDogsCopy.sort((a, b) => Number(b.weight_min) - Number(a.weight_min));
                if(state.listDogs.length){
                    state.listDogs.sort((a, b) => Number(b.weight_min) - Number(a.weight_min));
                    err = "";
                }
            }

            state.listDogs = state.listDogs;
            state.listDogsCopy = state.listDogsCopy;
            state.currentPage = 1;
            state.error = err;
            
        },
        gettingByName: (state, action) => {
            if(action.payload.length){
                state.listDogs = action.payload;
                state.totalDogs = action.payload.length;
                state.currentPage = 1;
                state.error= "";
            }else{
                state.listDogs = action.payload;
                state.error = "NO HAY RESULTADOS";
            }
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
    gettingListTemperaments,
    gettingFilterByOriginTemperament,
    gettingOrderByName,
    gettingOrderByWeight,
    gettingByName,
    successMsg, 
    errorMsg,
    setFirstPage,
    setPrevNextPage,
    setLastPage
} = dogsReducer.actions;

export default dogsReducer.reducer