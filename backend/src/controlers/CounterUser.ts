import { NextFunction, Request, Response } from "express";
const {genSaltSync, hashSync, compareSync } = require("bcrypt");

const jwt = require("jsonwebtoken");

import {validate} from "class-validator";

import { AppDataSource } from "../config/config";

import { CounterUser } from "../entity/CounterUser";
import { Counter } from "../entity/Counter";


/** 
const registercounter = async(req:Request, res:Response) => {
  const {counter_email, counter_password , counter_contact, counter_u_name} = req.body;


  const salt = genSaltSync(10);
  let counter = new CounterUser();

  counter.counter_email = req.body.counter_email;
  counter.counter_password= hashSync(req.body.counter_password,salt) 
  counter.counter_u_name= req.body.counter_u_name;
  counter.counter_contact= req.body.counter_contact;

  const errors = await validate (counter);
  if (errors.length > 0) {
    res.status(400).send(errors);
    return;
  }

  const counterRepository = AppDataSource.getRepository(CounterUser);

  try {
    await counterRepository.create(counter);
  } catch (e) {
    res.status(409).send("Counter Already exists");
    return;
  }
  res.status(200).send(" Counter added");
  console.log("Iteam added successfully");

};
*/

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

/** 
const login = async (req:Request, res:Response) => {

  const {counter_email, counter_password , counter_contact, counter_u_name} = req.body;

  if (!(counter_email && counter_password)){
    res.status(400).send();
  }
  const counteruserRepository = AppDataSource.getRepository(CounterUser);

   let counter: CounterUser;

   if(!counter){
    

   try {
        counter = await counteruserRepository.findOne({counter_password: counter_email});

    if (counter && !counter.isValidPassword(counter_password)){
      res.status(401).send("Incorrect password");
      return;
    }
    res.status(200).json({access_token: counter.generateJWT()});
   } catch (error){
    res.status(401).send(error);
   }
  }

}   */


const login = async (req:Request, res:Response) => {

  const counteruserRepository = AppDataSource.getRepository(CounterUser) 

  let counter = await counteruserRepository.findOne({where: {counter_email: req.body.counter_email}});
  if(counter){
      const password_valid = await compareSync(req.body.counter_password,counter.counter_password); 
      if(password_valid){
          const token = jwt.sign({"counter_u_id" : counter.counter_u_id, "counter_email" : counter.counter_email, "counter_u_name" : counter.counter_u_name},process.env.SECRET);
         
        /**   const counterRepository = AppDataSource.getRepository(Counter)
  
           let counterupdate = await counterRepository.findOneBy({counteruser:counter.counter_u_id}); 

           if(counterupdate){
              counterupdate.status= true;
      
                }
           res.status(200).send(counterupdate)  */
 
          res.status(200).json({ token : token, message: "Login successfuly"});
      }else {
          res.status(400).json({ error: "Password Incorrect"});
      }
  }else{
      res.status(404).json({error: "User does not exist"});
  }

 

}   

export default {addCounterUser,getAllCounterUser,getOneCounterUser, login,deleteOneCounterUser,updateOnecounter}
