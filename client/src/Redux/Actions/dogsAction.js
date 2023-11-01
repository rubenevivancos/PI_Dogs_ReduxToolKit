//import axios from "axios";

import { 
    gettingListDogs,  
    errorMsg
} from "../Reducer/dogsReducer";

import { LIST_DOGS } from "../../Utils/constants";



export const getListDogs =  () => async (dispatch) => {
    try{
        //let listDogs = (await axios.get(PRODUCTS_LIST_SHOPPING_CART + `?email=${email}`)).data;
        let listDogs = [];
        listDogs.push("Bonnie");
        console.log("listDogs.length -->" + listDogs.length);
        console.log(listDogs[0]);
        dispatch(gettingListDogs(listDogs));

    }catch(error){
        dispatch(errorMsg("Ocurrio un error...intentelo mas tarde"));
    }
}
