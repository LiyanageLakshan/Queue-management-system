import express, { Express } from "express";
import controller from '../controlers/Issue';

const { checkuserToken } = require("../auth/authnormaluser")
const { checkToken } = require("../auth/authcontroler")

const router = express.Router();

router.post('/create/',checkuserToken,controller.addIssue);


router.get('/update/:issue_id',controller.updateissue);

router.get('/delete/:issue_id',controller.deleteOneIssue);

router.get('/get/',checkToken, controller.getAllIssues);


router.get('/get/:issue_id', controller.getOneIssue);


router.get('/next/:issue_id', controller.getNextIssue);


export = router;