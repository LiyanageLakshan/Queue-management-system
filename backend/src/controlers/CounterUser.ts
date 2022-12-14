import { NextFunction, Request, Response } from "express";
const {genSaltSync, hashSync, compareSync } = require("bcrypt");

const jwt = require("jsonwebtoken");

const socket = require('../index')

import {validate} from "class-validator";

import { AppDataSource } from "../config/config";

import { CounterUser } from "../entity/CounterUser";
import { Counter } from "../entity/Counter";



const addCounterUser = async (req:Request,res: Response) => {
    if(!req.body.counter_email){
        res.status(400).send({
            message: 'Please Insert email',
        });
        return
    }

    const salt = genSaltSync(10);
    const counteruser = new CounterUser()
        counteruser.counter_u_name= req.body.counter_u_name
        counteruser.counter_email= req.body.counter_email
        counteruser.counter_contact= req.body.counter_contact
        counteruser.counter_password= hashSync(req.body.counter_password,salt) 
try{
        const counteruserRepository = AppDataSource.getRepository(CounterUser)

        await counteruserRepository.save(counteruser)
        console.log("Iteam added successfully")
        res.status(200).send(counteruser)
}catch(err){

    console.log(err);
      }
    };


// get all sellers

const getAllCounterUser = async (req:Request, res:Response) => {

  const counteruserRepository = AppDataSource.getRepository(CounterUser)
   
  const allcounteruser = await counteruserRepository.find()
  console.log("all counter usres", allcounteruser)

  res.status(200).send(allcounteruser)
}

// get id by  sellers

const getOneCounterUser = async (req:Request, res:Response) => {

  const counteruserRepository = AppDataSource.getRepository(CounterUser)
  const counter_user_id = res.locals.counter_u_id ;
  const onecounteruser = await counteruserRepository.findOneBy({counter_u_id: counter_user_id})

  console.log(onecounteruser)
  res.json(onecounteruser)
 
  //res.status(200).send(onecounteruser)
}

//update item

const updateOnecounter = async (req:Request, res:Response) => {

  const counteruserRepository = AppDataSource.getRepository(CounterUser)
  const counter_user_id = parseInt (req.params.counter_u_id);

  let counteruserupdate = await counteruserRepository.findOneBy({counter_u_id:counter_user_id}); 

  if(counteruserupdate){
    counteruserupdate.counter_u_name = req.body.counter_u_name;
    counteruserupdate.counter_contact= req.body.counter_contact;
  }
  res.status(200).send(counteruserupdate)
}

// delete item
const deleteOneCounterUser = async (req:Request, res:Response) => {

  const counteruserRepository = AppDataSource.getRepository(CounterUser);
  const counter_user_id = parseInt(req.params.counter_u_id);

  const counteruserremove = await counteruserRepository.findOneBy({counter_u_id:counter_user_id})

  if(counteruserremove){
    await counteruserRepository.remove(counteruserremove)
  }
  res.status(200).send('item is deleted')
}


// get id by counter counteruser 


  const getSellersItems = async (req:Request, res:Response) => {
  let id = req.params.s_id

  try {
    const counteruserRepository = AppDataSource.getRepository(CounterUser)
      const data = await counteruserRepository.find({
          relations: {
              counter: true,
          },
          
      });
      res.status(200).send(data);
      console.log(data);
    }catch(err:any){
      res.status(500).send({
          message: err.message || 'Error occured'
       })
  
    }
}  


//login




const login = async (req:Request, res:Response) => {

  const counteruserRepository = AppDataSource.getRepository(CounterUser) 

  let counter = await counteruserRepository.findOne({where: {counter_email: req.body.counter_email}});
  if(counter){
      const password_valid = await compareSync(req.body.counter_password,counter.counter_password); 
      if(password_valid){
          const token = jwt.sign({"counter_u_id" : counter.counter_u_id, "counter_email" : counter.counter_email, "counter_u_name" : counter.counter_u_name},process.env.SECRET);
         
       
 
          res.status(200).json({ token : token, message: "Login successfuly",username:counter.counter_u_name});
      }else {
          res.status(400).json({ error: "Password Incorrect"});
      }
  }else{
      res.status(404).json({error: "User does not exist"});
  }

 

}   

export default {addCounterUser,getAllCounterUser,getOneCounterUser, login,deleteOneCounterUser,updateOnecounter}
