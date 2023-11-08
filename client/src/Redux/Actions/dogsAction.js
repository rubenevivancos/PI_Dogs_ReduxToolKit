import axios from "axios";

import { gettingListDogs, errorMsg, 
         setFirstPage, setPrevNextPage, setLastPage} from "../Reducer/dogsReducer";



export const getListDogs =  () => async (dispatch) => {
    try{
        const listDogs = (await axios.get("http://localhost:3001/dogs/listDogs")).data;

        console.log("Se encontraron " + listDogs.length + " perros");

        dispatch(gettingListDogs(listDogs));

    }catch(error){
        dispatch(errorMsg("Ocurrio un error...intentelo mas tarde"));
    }
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