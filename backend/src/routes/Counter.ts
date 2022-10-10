import express, { Express } from "express";
import controller from '../controlers/Counter';

const { checkToken } = require("../auth/authcontroler")
const router = express.Router();

router.post('/create',checkToken,controller.addCounter);


router.patch('/update/:counter_id',controller.updateOnecounter);

router.delete('/delete/:counter_id',controller.deleteOneCounter);

router.get('/get/', controller.getAllCounter);


router.get('/get/:counter_id', controller.getOneCounter);



export = router;