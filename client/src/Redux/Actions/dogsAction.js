import axios from "axios";

import { gettingListDogs, gettingListTemperaments, gettingFilterByOriginTemperament,
         gettingOrderByName, gettingOrderByWeight,
         errorMsg, setFirstPage, setPrevNextPage, setLastPage} from "../Reducer/dogsReducer";



export const listDogs =  () => async (dispatch) => {
    try{
        const listDogs = (await axios.get("http://localhost:3001/dogs/listDogs")).data;

        console.log("Se encontraron " + listDogs.length + " perros");

        dispatch(gettingListDogs(listDogs));

    }catch(error){
        dispatch(errorMsg("Ocurrio un error...intentelo mas tarde"));
    }
}

export const listTemperaments =  () => async (dispatch) => {
    try{
        const listTemperaments = (await axios.get("http://localhost:3001/dogs/listTemperaments")).data;

        console.log("Se encontraron " + listTemperaments.length + " temperamentos");

        dispatch(gettingListTemperaments(listTemperaments));
            
    }catch(error){
        dispatch(errorMsg("Ocurrio un error...intentelo mas tarde"));
    }
}

export const filterByOriginTemperament = (filters)=> (dispatch) => {
    console.log("Origen: " + filters.origin);
    console.log("Temperamento: " + filters.temp);
    dispatch(gettingFilterByOriginTemperament(filters));
}

export const orderByName = (order) => (dispatch) => {
    console.log("orderByName: " + order);
    dispatch(gettingOrderByName(order));
}
  
export const orderByWeight = (order) => (dispatch) => {
    dispatch(gettingOrderByWeight(order));
}


export const firstPage =  () => (dispatch) => {
    dispatch(setFirstPage());
}

export const prevNextPage =  (valor) => (dispatch) => {
    dispatch(setPrevNextPage(valor));
}


export const lastPage =  () => (dispatch) => {
    dispatch(setLastPage());
}