import { useSelector } from 'react-redux';

import "./dogs.css";


export default function Dogs(){

    //Se obtiene el listado de perros del store
    const listDogs = useSelector((state) => state.dogsReducer.listDogs);

    if(listDogs.length){
        return(
            <div>
                FUNCIONO!!!! - { listDogs[0] }
            </div>
        )
    }

    return(
        <div className="container_cards">
            <img className="image" src="https://www.gifss.com/animales/perros/images/perro-animado-3.gif" alt="" />
        </div>
    )

} 