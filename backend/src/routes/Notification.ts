import express, { Express } from "express";
import controller from '../controlers/Notification';

const { checkuserToken } = require("../auth/authnormaluser")

const router = express.Router();

router.post('/create',checkuserToken,controller.addNotification);


router.patch('/update/:not_id',checkuserToken,controller.updateOneNotification);

router.delete('/delete/:not_id',controller.deleteOneNotification);

router.get('/get/',checkuserToken, controller.getAllNotification);


router.get('/get/:not_id', controller.getOneNotification);




export = router;