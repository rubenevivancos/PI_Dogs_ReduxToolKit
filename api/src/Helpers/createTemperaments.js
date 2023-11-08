const axios = require("axios");
const { Temperament } = require("../db");


const createTemperaments = async () => {
    console.log("createTemperaments - INICIO");
    try{
        const temp = await Temperament.findAll();
        //Descomentar y poner conn.sync() en api/index.js
        if(!temp.length){
            console.log("Tabla Temperament se procede a llenarla");
            const temperamentsApi = await axios.get(`https://api.thedogapi.com/v1/breeds`);
            const temperaments = temperamentsApi.data.map(t => t.temperament);
            const temps = temperaments.toString().split(",");
            temps.forEach(async el => {
                let i = el.trim()
                if(i.length > 0){
                    await Temperament.findOrCreate({
                        where: { name: i }
                   })
                }
            })
        }
        console.log("createTemperaments - FIN");
    }catch(error){
        console.log("createTemperaments - Excepcion: " + error.message);
    }
};

module.exports = createTemperaments;