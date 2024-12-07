import axios from "axios";

import { gettingListDogs, gettingListTemperaments, gettingFilterByOriginTemperament,
         gettingOrderByName, gettingOrderByWeight, gettingByName, gettingDogDetail, creatingDog,
         errorMsg, setFirstPage, setPrevNextPage, setLastPage} from "../Reducer/dogsReducer";



export const listDogs =  () => async (dispatch) => {
    try{
        const listDogs = (await axios.get("/dogs/listDogs")).data;

        console.log("Se encontraron " + listDogs.length + " perros");

        dispatch(gettingListDogs(listDogs));

    }catch(error){
        dispatch(errorMsg("Ocurrio un error...intentelo mas tarde"));
    }
}

export const listTemperaments =  () => async (dispatch) => {
    try{
        const listTemperaments = (await axios.get("/dogs/listTemperaments")).data;

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

export const getByName = (name) => async (dispatch) => {
    try {
        console.log("Se busca: " + name);
        var response = (await axios.get(`/dogs/getByName?name=${name}`)).data;
        console.log("[ src/Store/Actions/index.js/getByName(name) ] La busqueda por nombre de: " + name + " encontro " + response.length + " resultados"); 
        dispatch(gettingByName(response));

    } catch (error) {
        console.log("[ getByName(name) ] Excepcion: error.message: " + error.message);
        if(error.message === "Request failed with status code 422"){
            dispatch(gettingByName([]));
        }else{
            dispatch(errorMsg("Ocurrio un error...intentelo mas tarde"));
        }
    }
}

export const getDogDetail = (id) => async (dispatch) => {
    try {
        console.log("getDogDetail(id): INICIO");
        var response = (await axios.get("/dogs/"+id)).data;
        console.log("getDogDetail(id): Se recibio respuesta del backend");
        console.log("getDogDetail(id): response: " + response);

        dispatch(gettingDogDetail(response));

    } catch (error) {
        console.log("[ getDogDetail(id) ] Excepcion: error.message: " + error.message);
        if(error.message === "Request failed with status code 422"){
            dispatch(gettingDogDetail(null));
        }else{
            dispatch(errorMsg("Ocurrio un error...intentelo mas tarde"));
        }
    }
}

export const createDog = (dog) => async (dispatch) => {
    let response = null;
    try{
        response = (await axios.post("/dogs/createDog", dog)).data;
        
        dispatch(creatingDog(response));
    }catch(error){
        console.log("[ createDog ] Excepcion: error.message: " + error.message);
        if(error.message === "Request failed with status code 422"){
            dispatch(errorMsg("Faltan enviar datos obligatorios"));
        }else{
            dispatch(errorMsg("Ocurrio un error...intentelo mas tarde"));
        }
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