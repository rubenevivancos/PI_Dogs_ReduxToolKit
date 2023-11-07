const { Router } = require('express');
const { listDogs, listTemperaments, createDog, getByName, getDetail } = require("../Controllers/dogs");


const router = Router();




router.get('/listDogs', listDogs);

router.get('/listTemperaments', listTemperaments);

router.post('/createDog', createDog);

router.get("/getByName", getByName);

router.get("/getDetail", getDetail);
//router.get("/:idRaza", getDetail);





module.exports = router;