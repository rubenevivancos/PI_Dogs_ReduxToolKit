import { useSelector } from 'react-redux';
import { Link } from "react-router-dom";

import Pagination from "../Pagination/pagination.js";
import Dog from "../Dog/dog.js";
import "./dogs.css";


export default function Dogs(){

    //Se obtiene el listado de perros del store
    const listDogs = useSelector((state) => state.dogsReducer.listDogs);

    //Paginacion
    let currentPage = parseInt(useSelector((state) => state.dogsReducer.currentPage));
    let totalDogs = parseInt(useSelector((state) => state.dogsReducer.totalDogs));
    let itemsByPage = parseInt(useSelector((state) => state.dogsReducer.itemsByPage));

    let start = (currentPage - 1) * itemsByPage;
    let end = start + itemsByPage;
    if (end > totalDogs) end = totalDogs;
    if (start < 0) start = 0;
    //Paginacion

    const error = useSelector((state) => state.dogsReducer.error);


    if(listDogs.length){
        return(
            <div>
                <div className="container_cards">
                    { listDogs.map( dog => <Link to={"/dogDetail/"+dog.id} key={dog.id} className="link"><Dog dog={dog} /></Link>).slice(start, end) }
                </div>
                <div className="container_cards">
                        <table width="100%">
                            <tbody>
                                <tr>
                                    <td align="center">
                                        <div className="pagination_buttons">
                                            <Pagination />
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
            </div> 
        )
    }

    if(error == ""){
        return(
            <div className="container_cards">
                <h1>{error}</h1>
            </div>
        )
    }else{
        return(
            <div className="container_cards">
                <img className="image" src="https://www.gifss.com/animales/perros/images/perro-animado-3.gif" alt="" />
            </div>
        )
    }

} 