const axios = require("axios");
const { Dog, Temperament } = require("../db");
const { IMAGE_URL, IMAGE_TYPE } = process.env;



async function listDogs(req, res){
    console.log("[ src/routes/dogs.js/listDogs ] INICIO");
    try {   
        const listDogs = await getListDogs();
        console.log("[ src/routes/dogs.js/listDogs ] Se obtuvo el listado de perros");
        console.log("[ src/routes/dogs.js/listDogs ] listDogs --> " + listDogs.length);
        console.log("[ src/routes/dogs.js/listDogs ] FIN");
        return res.status(200).json(listDogs);
    } catch (error) {
        console.log("[ src/routes/dogs.js/listDogs ] Ocurrio una excepcion: " + error.message);
        //next(error);
        return res.status(404).send(error.message);
    }
}


async function getListDogs() {
    console.log("[ src/Controllers/dogs.js/getListDogs ] INICIO");
    let arrayDogsFull = [];
    try {
        let arrayDogsAPI = await getListDogsAPI();
        let arrayDogsDB = await getListDogsDB();

        arrayDogsFull = arrayDogsAPI.concat(arrayDogsDB);
        console.log("[ src/Controllers/dogs.js/getListDogs ] FIN");
        //let dbPokemons = await getPokemonsDb(); 
        //resp = apiPokemons.concat(dbPokemons);
    } catch (error) {
        console.log("[ src/Controllers/dogs.js/getListDogs ] ERROR: " + error.message);
    }
    return arrayDogsFull;
};

async function getListDogsDB(){
    console.log("[ src/Controllers/dogs.js/getListDogsDB ] INICIO");
    let arrayDogsDB = null;
    try{
        let arrayDogs = await Dog.findAll({include: Temperament});
        console.log("[ src/Controllers/dogs.js/getListDogsDB ] Se encontraron " + arrayDogs.length + " perros en la BD");

        arrayDogsDB = arrayDogs.map( dog => {
            dog.Temperaments = dog.Temperaments.map(t => t.name);
            dog.Temperaments = dog.Temperaments.join(", ");

            return{
                id: dog.id,
                image: dog.image,
                name: dog.name,
                weight_min: dog.weight_min,
                weight_max: dog.weight_max,
                height_min: dog.height_min,
                height_max: dog.height_max,
                life_span_min: dog.life_span_min,
                life_span_max: dog.life_span_max,
                temperament: dog.Temperaments,
                creadoEnDB: dog.creadoEnDB
            }
        });

        console.log("[ src/Controllers/dogs.js/getListDogsDB ] FIN");
    } catch(error){
        console.log("[ src/Controllers/dogs.js/getListDogsDB ] ERROR: " + error.message);
    }
    return arrayDogsDB;
}

async function getListDogsAPI() {
    console.log("[ src/Controllers/dogs.js/getListDogsAPI ] INICIO");
    let arrayDogs = [];

    try{
        let arrayDogsApi = await axios.get("https://api.thedogapi.com/v1/breeds");

        arrayDogs = arrayDogsApi.data.map( dog => {

            let weight = dog.weight.metric.split("-");
            let weightMin = 1;
            let weightMax = 90;

            if(weight.length > 1){
                weightMin = Number.isInteger(Number.parseInt(weight[0].trim())) ? weight[0].trim() : "1";
                weightMax = Number.isInteger(Number.parseInt(weight[1].trim())) ? weight[1].trim() : "90";
            }else if(Number.isInteger(Number.parseInt(weight[0].trim()))){
                weightMin = weight[0].trim();
                weightMax = weightMin;
            }

            return{
                id: dog.id,
                image: `${IMAGE_URL}` + dog.reference_image_id + `${IMAGE_TYPE}`,
                name: dog.name,
                weight_min: weightMin,
                weight_max: weightMax,
                height_min: dog.height.metric.slice(0, 2).trim(),
                height_max: dog.height.metric.slice(4).trim(),
                life_span_min: dog.life_span.slice(0, 2).trim(),
                life_span_max: dog.life_span.slice(4, -6).trim(),
                temperament: !dog.temperament ? "": dog.temperament,
                creadoEnDB: false
            }
        });
        console.log("[ src/Controllers/dogs.js/getListDogsAPI ] Se obtuvieron : " + arrayDogs.length + " perros de la API");
    }catch(error){
        console.log("[ src/Controllers/dogs.js/getListDogsAPI ] Excepcion: " + error.message);
    }
    return arrayDogs;
};


async function listTemperaments(req, res){
    console.log("[ src/routes/dogs.js/listTemperaments ] INICIO");
    try {   
        const listTemperaments = await getListTemperaments();
        console.log("[ src/routes/dogs.js/listTemperaments ] Se obtuvo el listado de temperamentos");
        console.log("[ src/routes/dogs.js/listTemperaments ] listDogs --> " + listTemperaments.length);
        console.log("[ src/routes/dogs.js/listTemperaments ] FIN");
        return res.status(200).json(listTemperaments);
    } catch (error) {
        console.log("[ src/routes/dogs.js/listTemperaments ] Ocurrio una excepcion: " + error.message);
        //next(error);
        return res.status(404).send(error.message);
    }
}

async function getListTemperaments(){
    console.log("[ src/Controllers/dogs.js/getListTemperaments ] INICIO");
    let arrayTemperaments = null;
    try{
        arrayTemperaments = await Temperament.findAll();
        arrayTemperaments.sort((a, b) => a.name.localeCompare(b.name));
        console.log("[ src/Controllers/dogs.js/getListTemperaments ] Se encontraron " + arrayTemperaments.length + " temperamentos en la BD");
        console.log("[ src/Controllers/dogs.js/getListTemperaments ] FIN");
    } catch(error){
        console.log("[ src/Controllers/dogs.js/getListTemperaments ] ERROR: " + error.message);
    }
    return arrayTemperaments;
}


async function createDog(req, res){
    console.log("[ src/routes/dogs.js/createDog ] INICIO");

    const {name, image, minimunHeight, maximumHeight, minimunWeight, 
           maximumWeight, minimumYearsOfLife, maximumYearsOfLife, temperaments} = req.body;

    if(!name || !minimunHeight || !maximumHeight || !minimunWeight || !maximumWeight ||
        minimunHeight == 0 || maximumHeight == 0 || minimunWeight == 0 || maximumWeight == 0) {
        console.log("[ src/routes/dogs.js/createDog ] Falta enviar datos obligatorios");
        return res.status(422).json({message: "Falta enviar datos obligatorios"});
    }
    
    try {
        console.log("[ src/routes/dogs.js/createDog ] Valores a ingresar:");
        console.log("[ src/routes/dogs.js/createDog ] name: " + name);
        console.log("[ src/routes/dogs.js/createDog ] height_min: " + minimunHeight);
        console.log("[ src/routes/dogs.js/createDog ] height_max: " + maximumHeight);
        console.log("[ src/routes/dogs.js/createDog ] weight_min: " + minimunWeight);
        console.log("[ src/routes/dogs.js/createDog ] weight_max: " + maximumWeight);
        console.log("[ src/routes/dogs.js/createDog ] life_span_min: " + minimumYearsOfLife);
        console.log("[ src/routes/dogs.js/createDog ] life_span_max: " + maximumYearsOfLife);
        console.log("[ src/routes/dogs.js/createDog ] image: " + image);
        console.log("[ src/routes/dogs.js/createDog ] temperaments: " + temperaments.length);

        const dog = await Dog.create({
            name,
            height_min: minimunHeight,
            height_max: maximumHeight,
            weight_min: minimunWeight,
            weight_max: maximumWeight,
            life_span_min: minimumYearsOfLife,
            life_span_max: maximumYearsOfLife,
            image
        });

        let array = temperaments.map( element => element.id );
        
        await dog.addTemperament(array);
        
        console.log("[ src/routes/dogs.js/createDog ] Se registro el perro exitosamente");
        return res.status(201).json({msg: "Se registro el perro exitosamente"});
    } catch (error) {
        console.log("[ src/routes/dogs.js/createDog ] Ocurrio una excepcion: " + error.message);
        return res.status(400).json({message: error.message});
    }
}


async function getByName(req, res){
    console.log("[ src/routes/dogs.js/getByName ] INICIO");
    const { name } = req.query;
    const listDogs = await getListDogs();

    if (name) {
        console.log("[ src/routes/dogs.js/getByName ] El nombre a buscar es: " + name);
        const dog = listDogs.filter(d => d.name.toLowerCase().includes(name.toLowerCase()));
        if(dog.length){
            console.log("[ src/routes/dogs.js/getByName ] Se encontraron " + dog.length + " resultados");
            return res.status(200).json(dog);
        }
        console.log("[ src/routes/dogs.js/getByName ] No hay resultados");
        return res.status(422).json({message: "No hay resultados"}); 
    }

    return res.status(200).json(listDogs);
}


async function getDetail(req, res){
    console.log("[ src/routes/dogs.js/:idRaza ] INICIO");
    const { idRaza } = req.params;
    const listDogs = await getListDogs();

    if (idRaza) {
        console.log("[ src/routes/dogs.js/:idRaza ] El id a buscar es: " + idRaza);
        const dog = listDogs.filter(d => d.id == idRaza);
        if(dog.length){
            console.log("[ src/routes/dogs.js/:idRaza ] Se encontro el detalle del perro");
            console.log("[ src/routes/dogs.js/:idRaza ] El perro es: " + dog[0].name);
            return res.status(200).json(dog[0]);
        }
        console.log("[ src/routes/dogs.js/:idRaza ] No hay resultados");
        return res.status(422).json({message: "No hay resultados"}); 
    }

    return res.status(400).json({message: "Falta enviar datos obligatorios"});
}


module.exports ={
    listDogs,
    listTemperaments,
    createDog,
    getByName,
    getDetail
};