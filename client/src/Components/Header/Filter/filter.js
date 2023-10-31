import React from "react";

import "./filter.css";


export default function Filter() {

    return(
        <div>
        FILTROS:
        <div className="header">
            <div className="header">
                Creado en:&nbsp;&nbsp;
                <select name="origin" >
                    <option disabled defaultValue>--Seleccione--</option>
                    <option value="0">Todos</option>
                    <option value="false">API</option>
                    <option value="true">BD</option>
                </select>
                <div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</div>
                <div>Temperamentos:&nbsp;&nbsp;</div>
                <select name="temperaments" >
                    <option disabled defaultValue>--Seleccione--</option>
                    <option value="0">Todos</option>
                </select>
            </div>
        </div>
        </div>
    )
}