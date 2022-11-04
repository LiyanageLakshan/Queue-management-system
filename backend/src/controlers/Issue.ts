import { NextFunction, Request, Response } from "express";

import { AppDataSource } from "../config/config";

import { Issue, StatusFormat } from "../entity/Issue";

import { Counter } from "../entity/Counter";
import {NormalUser} from "../entity/NormalUser";
import {CounterUser} from "../entity/CounterUser";
import {Notification} from "../entity/Notification";


const socket = require('../index')

const addIssue = async (req:Request,res: Response) => {
  const issue : string = req.body.issue

  const userid : number = res.locals.user_id
  if(!issue) return res.status(500).send("no issue")

  let counter;
  try{
    const counterRepository = AppDataSource.getRepository(Counter)
    counter = await counterRepository.findOneOrFail({where:{status:true},order: {last_token:"ASC"}

    
   
    })
   
  }catch(error){
      return res.status(500).send("counter not found")
  }
  

  
      try{

        const nuserRepository = AppDataSource.getRepository(NormalUser)
        const date = new Date(counter.updated_at)
        const datel = new Date()      
        const nuser = await nuserRepository.findOneOrFail({where:{user_id:userid}})

        

        if(date.getDate()!=datel.getDate()){
          var token : number = 1
          counter.current_token  = 0
          counter.next_token = token
        }else{
          var token : number = counter.last_token + 1
          counter.next_token === null ? counter.next_token = token : ''
        }
      
        console.log(counter.counter_id)
        //var queue = counter.issue.queue_no +1
        const status = StatusFormat.PENDING 
        const issues = new Issue()
        //const counter = counter
    
        issues.u_contact_no= req.body.user_contact;
        issues.issue= req.body.issue;
        issues.nuser =  nuser;
        issues.queue_no = token;
        issues.status = status;
        issues.counter = counter;
     
    try{
          const issueRepository = AppDataSource.getRepository(Issue)
  
          await issueRepository.save(issues)
          if(issues){
  
            }
            socket.io.to(counter).emit("reference_issue","Refresh_issue");
          console.log("Iteam added successfully")
          console.log(issues)
          //res.status(200).send(issues)
         
          }catch(err){
  
         console.log(err);
          }

     // update counter
     

     if(counter){
      const counterRepository = AppDataSource.getRepository(Counter)
     //counter.next_token = token
      counter.next_token = token;  
    
    await counterRepository.save(counter)
  }

  //socket.io.to(counter.counter_id).emit("reference_issue",{})
  //socket.io.to(counter.counter_id).emit("reference_counter",{});

  return console.log("Issue Created Successfuly")
      }catch (error:any){

        if(error.code === 'ER_DUP_ENTRY'){

        }else {
          console.log(error);
        }
        //res.status(401).send("Something Went wrong")
       
      }
}


// get all 

const getAllIssues= async (req:Request, res:Response) => {

  const counteruserRepository = AppDataSource.getRepository(CounterUser)
  const counter_user_id = res.locals.counter_u_id ;
  const counteru = await counteruserRepository.findOne({where:{counter_u_id: counter_user_id},
  relations:{counter:true}})

  if(counteru){
    const issuesRepository = AppDataSource.getRepository(Counter)
    const counter_id = counteru.counter?.counter_id;
    const counteri = await issuesRepository.find({where:{counter_id:counter_id},relations:{
        issue:true
    }})
    
      //console.log("counter ",counteri[0].issue)
      res.status(200).send(counteri[0].issue)
  
    }
  
  }



// get id by  

const getOneIssue= async (req:Request, res:Response) => {

  const issueRepository = AppDataSource.getRepository(Issue);
  const issue_id = parseInt(req.params.issue_id);
  //const counter_user_id = res.locals.counter_u_id ;
  const oneissue = await issueRepository.findOne({where:{issue_id: issue_id },relations:{
    counter:true
  }});

  if(oneissue){
    //socket.io.to(oneissue.nuser.user_fname).emit("notification",{});
    const status = StatusFormat.ONGOIN 
    //issueupdate.issue = req.body.issue;
    oneissue.status = status;
    await issueRepository.save(oneissue)

  }

  //console.log("Display issue", oneissue)
 
  res.status(200).send(oneissue)
}



const getNextIssue= async (req:Request, res:Response) => {

  const issueRepository = AppDataSource.getRepository(Issue);
  
  const status = StatusFormat.PENDING 
  const issues = await issueRepository.findOneOrFail({where:{status:status},order: {queue_no:"ASC"}
  })
  const new_id = issues.queue_no + 1
  const counterRepository = AppDataSource.getRepository(Counter);
  const counter = issues.counter
  //const counter = await counterRepository.findOne({where:{counter_id: counter_id}})

  if(counter){
    var que : number = 1
    counter.current_token  = que + 1;
    counter.next_token = que + 1;
    counter.last_token = que + 1;
    await counterRepository.save(counter)
  }
  //const counter_user_id = res.locals.counter_u_id ;
  const nextissue = await issueRepository.findOneBy({queue_no: new_id});
  if(nextissue){
    const status = StatusFormat.ONGOIN 
    //issueupdate.issue = req.body.issue;
    nextissue.status = status;
    await issueRepository.save(nextissue)

  }

  //console.log("Display issue", nextissue)
 
  res.status(200).send(nextissue)
}

//update item

const updateOneissue = async (req:Request, res:Response) => {

  const issueRepository = AppDataSource.getRepository(Issue)
  const issue_id = parseInt (req.params.issue_id);

  let issueupdate = await issueRepository.findOne({where:{issue_id:issue_id}, relations:{
    counter:true
  }}); 

  if(issueupdate){
    const status = StatusFormat.ONGOIN 
    //issueupdate.issue = req.body.issue;
    issueupdate.status = status;
    await issueRepository.save(issueupdate)

    const counterRepository = AppDataSource.getRepository(Counter);
    const counter_id = issueupdate.counter.counter_id
    const counter = await counterRepository.findOne({where:{counter_id: counter_id}})
   
  if(counter){
    var que : number = 1
    counter.current_token  = que + 1;
    counter.next_token = que + 1;
    counter.last_token = que + 1;
    await counterRepository.save(counter)
    console.log("onging",counter)
  }
}
//console.log("onging",counter)
  res.status(200).send(issueupdate)
}

//update item done

const updateissue = async (req:Request, res:Response) => {

  const issueRepository = AppDataSource.getRepository(Issue)
  const issue_id = parseInt (req.params.issue_id);

  let issueupdate = await issueRepository.findOne({where:{issue_id:issue_id},relations:{counter:true, nuser:true}}); 

  if(issueupdate){
    const status = StatusFormat.DONE 
    //issueupdate.issue = req.body.issue;
    issueupdate.status = status;
    await issueRepository.save(issueupdate)

  }
 
  if(issueupdate.counter){
    

    const counterRepository = AppDataSource.getRepository(Counter)
    let counterupdate = await counterRepository.findOne({where:{counter_id:issueupdate.counter.counter_id},relations:{issue:true}});

    socket.io.to(counterupdate.counter_id).emit("reference_issue",{});
    socket.io.to(counterupdate.counter_id).emit("reference_counter",{});

    const date = new Date(counterupdate.updated_at)
    const datel = new Date()  
      

    var que : number = 1
    counterupdate.current_token = counterupdate.last_token +1;
    counterupdate.next_token = counterupdate.next_token +1;
    counterupdate.last_token = counterupdate.last_token +1;

    await counterRepository.save(counterupdate)

    if(issueupdate.queue_no = counterupdate.next_token){
      const notiRepository = AppDataSource.getRepository(Notification)
      const noti = new Notification
      const notific = "Your Are next"
      noti.notification = notific
      noti.nuser = res.locals.user_id
      socket.io.to(issueupdate.nuser.user_fname).emit("notification",{});
      socket.io.to(counterupdate.counter_id).emit("reference_counter",{next:issueupdate.queue_no,current:issueupdate.queue_no})

      await notiRepository.save(noti)

    }
  }
 
  res.status(200).send(issueupdate)
}

// delete item
const deleteOneIssue = async (req:Request, res:Response) => {
  const issueRepository = AppDataSource.getRepository(Issue);
  const issue_id = parseInt(req.params.issue_id);

  const issueremove = await issueRepository.findOneBy({issue_id:issue_id})
  socket.io.to(issueremove.counter.counter_id).emit("cancel_counter",{next:null});

  if(issueremove){

    const status = StatusFormat.CANCEL
    issueremove.status= status
    await issueRepository.save(issueremove)
  }
  res.status(200).send('item is deleted')
}






export default {addIssue,getAllIssues,getOneIssue,deleteOneIssue,updateOneissue,updateissue, getNextIssue}
