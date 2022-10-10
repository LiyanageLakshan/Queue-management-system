import { NextFunction, Request, Response } from "express";
const {genSaltSync, hashSync, compareSync } = require("bcrypt");

const jwt = require("jsonwebtoken");

import {validate} from "class-validator";

import { AppDataSource } from "../config/config";

import { NormalUser } from "../entity/NormalUser";

import { Counter} from "../entity/Counter";

import { Issue} from "../entity/Issue";
import { StatusFormat } from "../entity/Issue";


/** 
const Registeruser = async(req:Request, res:Response) => {
  const {user_email, user_password , user_fname} = req.body;


  const salt = genSaltSync(10);
  let user = new NormalUser();

  user.user_email = user_email;
  user.user_password= hashSync(req.body.user_password,salt);
  user.user_fname= user_fname;


  const errors = await validate (user);
  if (errors.length > 0) {
    res.status(400).send(errors);
    return;
  }

  const userRepository = AppDataSource.getRepository(NormalUser);

  try {
    await userRepository.create(user);
  } catch (e) {
    res.status(409).send("Counter Already exists");
    return;
  }
  res.status(200).send(" Counter added");
  console.log("Iteam added successfully");

};
*/

const addUser = async (req:Request,res: Response) => {
    if(!req.body.user_email){
        res.status(200).send({
            message: 'Please Insert email',
        });
        return
    }
    const salt = genSaltSync(10);
    const user = new NormalUser()
        user.user_fname= req.body.user_fname
        user.user_email= req.body.user_email
        user.user_password= hashSync(req.body.user_password,salt) 
try{
        const userRepository = AppDataSource.getRepository(NormalUser)

        await userRepository.save(user)
        console.log("User added successfully")
        res.status(200).send(user)
}catch(err){

    console.log(err);
      }
    };


// get all sellers

const getAllUsers = async (req:Request, res:Response) => {

  const userRepository = AppDataSource.getRepository(NormalUser)
   
  const alluser = await userRepository.find()
  console.log("all counter usres", alluser)

  res.status(200).send(alluser)
}

// get id by  sellers

const getOneUser = async (req:Request, res:Response) => {

  const userRepository = AppDataSource.getRepository(NormalUser)
  const user_id = res.locals.user_id;
  const oneuser = await userRepository.findOneBy({user_id: user_id})

  console.log(" user", oneuser)
  res.json(oneuser);
 
  //res.status(200).send(oneuser)
}


const getcounter = async (req:Request, res:Response) => {

  const userRepository = AppDataSource.getRepository(NormalUser)
  const user_id = res.locals.user_id ;
  const oneuser = await userRepository.findOneBy({user_id: user_id})

  if(oneuser){
    const issueRepository = AppDataSource.getRepository(Issue)
    const nuser = oneuser;
    const issue = await issueRepository.findOne({where:{nuser:nuser}, order: {issue_id:"DESC"},relations:{
      counter:true
    }})
    if(issue){
      const counterRepository = AppDataSource.getRepository(Counter)
      const counter = issue.counter;
      //const counters = await counterRepository.findOne({counter_id: counter}) 

      console.log(counter)
      res.json(counter)
    }
   
  }
  
  //res.status(200).send(onecounteruser)
}


const getque = async (req:Request, res:Response) => {

  const userRepository = AppDataSource.getRepository(NormalUser)
  const user_id = res.locals.user_id ;
  const oneuser = await userRepository.findOneBy({user_id: user_id})

  if(oneuser){
    const issueRepository = AppDataSource.getRepository(Issue)
    const nuser = oneuser;
    const issue = await issueRepository.findOne({where:{nuser:nuser}, order: {issue_id:"DESC"} })

      console.log(issue)
      res.json(issue)
    
  } 
  
  //res.status(200).send(onecounteruser)
}


//update item

const updateOneuser = async (req:Request, res:Response) => {

  const userRepository = AppDataSource.getRepository(NormalUser)
  const user_id = parseInt (req.params.user_id);

  let userupdate = await userRepository.findOneBy({user_id:user_id}); 

  if(userupdate){
    userupdate.user_fname = req.body.user_fname;
    userupdate.user_email = req.body.user_email;
    userupdate.user_password = req.body.user_password;
  }
  res.status(200).send(userupdate)
}

// delete item
const deleteOneUser = async (req:Request, res:Response) => {

  const userRepository = AppDataSource.getRepository(NormalUser);
  const user_id = parseInt(req.params.user_id);

  const userremove = await userRepository.findOneBy({user_id:user_id})

  if(userremove){
    await userRepository.remove(userremove)
  }
  res.status(200).send('item is deleted')
}




const Userlogin = async (req:Request, res:Response) => {

  const userRepository = AppDataSource.getRepository(NormalUser) 

  let user = await userRepository.findOne({where: {user_email: req.body.user_email}});
  if(user){
      const password_valid = await compareSync(req.body.user_password,user.user_password); 
      if(password_valid){
          const token = jwt.sign({"user_id" : user.user_id, "user_email" : user.user_email, "usre_fname" : user.user_fname},process.env.SECRET);
         
          res.status(200).json({ token : token, message: "Login successfuly"});
      }else {
          res.status(400).json({ error: "Password Incorrect"});
      }
  }else{
      res.status(404).json({error: "User does not exist"});
  }
 

}   

export default {addUser,getAllUsers,getOneUser, Userlogin,deleteOneUser,updateOneuser,getque,getcounter}
