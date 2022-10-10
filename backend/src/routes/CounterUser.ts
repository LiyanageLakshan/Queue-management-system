import express, { Express } from "express";
import controller from '../controlers/CounterUser';

const { checkToken } = require("../auth/authcontroler")

const router = express.Router();

router.post('/create',controller.addCounterUser);

//router.post('/register',controller.registercounter);

router.patch('/update/:counter_u_id',controller.updateOnecounter);

router.delete('/delete/:counter_u_id',controller.deleteOneCounterUser);

router.get('/get/', controller.getAllCounterUser);

router.post('/login',controller.login);

router.get('/auth',checkToken, controller.getOneCounterUser);

//router.delete('/delete/:counteruid', controller.deleteOneCounterUser);


export = router;