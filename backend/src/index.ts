import  express, { NextFunction, Router }  from "express";

import "reflect-metadata";

import { serverSocket } from "./socket";

const cors = require("cors")

import http from "http";

const socket =  require( "socket.io");


const router = express();

import Logging from "./lib/login";

import { config ,AppDataSource} from './config/config';

const counteruserRoutes = require("./routes/CounterUser");

const counterRoutes = require("./routes/Counter");

const issueRoutes = require("./routes/Issue");

const normaluserRoutes = require("./routes/NormalUser");

const notificationRoutes = require("./routes/Notification");

const PORT = process.env.SERVER_PORT || 9090;


/** 
const server = http.createServer(app)

const io = new Server(server,{
  cors: {
    origin:"http://localhost:3000",
    methods: ["GET","POST"],
  },

});
io.on("connection",(socket:any) =>{
  console.log('user connected:${socket.id}')
}) */

AppDataSource.initialize()
  .then(() => { Logging.info('connected to my sql');
  

  })
  .catch((error)=>console.log(error))

//new serverSocket(httpServer);



const app = express();
const httpServer = http.createServer(app);
const io = socket(httpServer,{
  pingTimeout:60000,
  cors:{
     origin:"http://localhost:3000",
  },
  path: '/socket.io'
});

const client: Array<any> = [];

  io.on('connection',(socket: {
    [x: string]: any;
    emit(arg0: string): unknown;
    join(_id: any): unknown; push: (arg0: any) => void; on: (arg0: string, arg1: () => void) => void; splice: (arg0: any, arg1: number) => void; indexOf: (arg0: any) => any; 
}) =>{
    console.log(`Client connected ${socket.id}`);
    //client.push(client);
    console.log(socket);

    socket.on("setup",(userData=[]) =>{
      socket.join(userData.indexOf);
      console.log(userData.indexOf)
      socket.emit("connected");
      

    });

    socket.on('disconnected' , () =>{
      socket.splice(socket.indexOf(socket),1);
      console.log('Client disconnected $(client.id)');
    });
  });


  app.use(express.urlencoded({extended:true}));
  app.use(express.json());
  /** Rules of api */

  app.use((req,res,next)=>{
    res.header('Access-Control-Allow-Origin','*');
    res.header('Access-Control-Allow-Headers','Origin,X-requested-With, Content-Type,Accept,Authorization');

    if(req.method== 'OPTIONS') {
      res.header('Access-Control-Allow-Methoda','PUT,POST,PATCH,DELETE,GET');
      return res.status(200).json({});

    }

    next();
  });

 /** Routes */


 app.use('/counteruser', counteruserRoutes);

 app.use('/counter', counterRoutes);

 app.use('/issue', issueRoutes);

 app.use('/normaluser', normaluserRoutes);

 app.use('/notification', notificationRoutes);

  /**Healthcheck */
 app.get('/ping', (req, res, next) => res.status(200).json({messsage: 'ping'}));


  /** Error handling */
  app.use((req, res, next) =>{
    const error = new Error('not found');
    Logging.error(error);

    return res.status(404).json({ message:error})
 });

 httpServer.listen(PORT,() => {
  console.log('Sever started at $(PORT)');
});
 










