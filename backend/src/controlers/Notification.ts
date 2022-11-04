import { NextFunction, Request, Response } from "express";


import { AppDataSource } from "../config/config";

import { Notification } from "../entity/Notification";

import { NormalUser } from "../entity/NormalUser";


const addNotification = async (req:Request,res: Response) => {
    if(!req.body.notification){
        res.status(400).send({
            message: 'Please Insert notification',
        });
        return
    }
    
    const noti = new Notification()
        noti.notification= req.body.notification;
        noti.nuser= res.locals.user.user_id;
        
       
try{
        const notiRepository = AppDataSource.getRepository(Notification)

        await notiRepository.save(noti)
        console.log("Notification added successfully")
        //res.status(200).send(noti)
}catch(err){

    console.log(err);
      }
    };


// get all sellers

const getAllNotification = async (req:Request, res:Response) => {

  const counteruserRepository = AppDataSource.getRepository(NormalUser)
  const user_id = res.locals.user_id ;
  const user = await counteruserRepository.findOne({where:{user_id: user_id},
  relations:{notifi:true}})

  console.log('notification' , user?.notifi)
  res.status(200).send(user?.notifi)

}

// get id by  sellers

const getOneNotification= async (req:Request, res:Response) => {

  const notiRepository = AppDataSource.getRepository(Notification)
  const not_id = parseInt(req.params.not_id);
  const onenoti = await notiRepository.findOneBy({not_id: not_id})

  console.log("counter user", onenoti)
 
  res.status(200).send(onenoti)
}

//update item

const updateOneNotification = async (req:Request, res:Response) => {

  const counterRepository = AppDataSource.getRepository(Notification)
  const not_id = parseInt (req.params.not_id);

  let counterupdate = await counterRepository.findOneBy({not_id:not_id}); 

  if(counterupdate){
    counterupdate.notification = req.body.notification;
   
  }
  res.status(200).send(counterupdate)
}

// delete item
const deleteOneNotification = async (req:Request, res:Response) => {

  const notiRepository = AppDataSource.getRepository(Notification);
  const not_id = parseInt(req.params.not_id);

  const notiremove = await notiRepository.findOneBy({not_id:not_id})

  if(notiremove){
    await notiRepository.remove(notiremove)
  }
  res.status(200).send('item is deleted')
}





export default {addNotification,getAllNotification,getOneNotification,deleteOneNotification,updateOneNotification}
