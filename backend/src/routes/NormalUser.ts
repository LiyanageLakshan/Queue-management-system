import express, { Express } from "express";
import controller from '../controlers/NormalUser';

const { checkuserToken } = require("../auth/authnormaluser")

const router = express.Router();

router.post('/create',controller.addUser);

//router.post('/register',controller.Registeruser);

router.patch('/update/:user_id',controller.updateOneuser);

router.delete('/delete/:user_id',controller.deleteOneUser);

router.get('/get/', controller.getAllUsers);

router.post('/login',controller.Userlogin);

router.get('/authuser/',checkuserToken, controller.getOneUser);

router.get('/counter/',checkuserToken, controller.getcounter);

router.get('/que/',checkuserToken, controller.getque);



export = router;