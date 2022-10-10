import { NextFunction, Request, Response } from "express";


import { AppDataSource } from "../config/config";

import { Counter } from "../entity/Counter";




const addCounter = async (req:Request,res: Response) => {
    if(!req.body.counter_name){
        res.status(400).send({
            message: 'Please Insert email',
        });
        return
    }
    
    const counter = new Counter()
        counter.counter_name = req.body.counter_name;
        counter.counteruser = res.locals.counter.counter_u_id;
       
   try{
        const counterRepository = AppDataSource.getRepository(Counter)

        await counterRepository.save(counter)
        console.log("Iteam added successfully")
        res.status(200).send(counter)
}catch(err){

    console.log(err);
      }
    };


// get all sellers

const getAllCounter = async (req:Request, res:Response) => {

  const counterRepository = AppDataSource.getRepository(Counter)
   
  const allcounter = await counterRepository.find()
  console.log("all counter usres", allcounter)

  res.status(200).send(allcounter)
}

// get id by  sellers

const getOneCounter= async (req:Request, res:Response) => {

  const counterRepository = AppDataSource.getRepository(Counter)
  const counter_id = parseInt(req.params.counter_id);
  const onecounteruser = await counterRepository.findOneBy({counter_id: counter_id})

  console.log("counter user", onecounteruser)
 
  res.status(200).send(onecounteruser)
}

//update item

const updateOnecounter = async (req:Request, res:Response) => {

  const counterRepository = AppDataSource.getRepository(Counter)
  const counter_id = parseInt (req.params.counter_id);

  let counterupdate = await counterRepository.findOneBy({counter_id:counter_id}); 

  if(counterupdate){
    counterupdate.counter_name = req.body.counter_name;
   
  }
  res.status(200).send(counterupdate)
}

// delete item
const deleteOneCounter = async (req:Request, res:Response) => {

  const counterRepository = AppDataSource.getRepository(Counter);
  const counter_id = parseInt(req.params.counter_id);

  const counterremove = await counterRepository.findOneBy({counter_id:counter_id})

  if(counterremove){
    await counterRepository.remove(counterremove)
  }
  res.status(200).send('item is deleted')
}

// get seller's items

 /**   const getSellersItems = async (req:Request, res:Response) => {
  let id = req.params.s_id

  try {
      const data = await Seller.findAll({
          include: [{
              model: items,
          }],
          where: {s_id: id}
      });
      res.status(200).send(data);
      console.log(data);
    }catch(err){
      res.status(500).send({
          message: err.message || 'Error occured'
       })
  
    }
}  

*/
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



export default {addCounter,getAllCounter,getOneCounter,deleteOneCounter,updateOnecounter}
