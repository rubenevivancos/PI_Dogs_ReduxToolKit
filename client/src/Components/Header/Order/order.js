import React from "react";

import "./order.css";


export default function Order() {

    return(
        <div>
            <div>Ordenar por:</div>
            <select name="orderBy" >
              <option value="name_asc">Nombre (asc)</option>
              <option value="name_des">Nombre (des)</option>
              <option value="weight_asc">Peso (asc)</option>
              <option value="weight_des">Peso (des)</option>
            </select>
        </div>
    )
}