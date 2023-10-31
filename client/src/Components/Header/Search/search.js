import React, { useState } from "react";
import "./search.css";


export default function Search() {

    return(
        <div className="searchbar_container">
            <input className="searchbar" type="text" placeholder="Buscar..."/>
            <button className="searchbar_button" type="button">
                Buscar
            </button>
        </div>
    )
}