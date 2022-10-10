import dotenv from 'dotenv';
dotenv.config();


import { DataSource } from "typeorm";
import { CounterUser } from "../entity/CounterUser";
import {Counter} from "../entity/Counter";
import {NormalUser} from "../entity/NormalUser";
import {Issue} from "../entity/Issue";
import {Notification} from "../entity/Notification";

export const AppDataSource = new DataSource({

    type: "mysql",
    host: "localhost",
    port:3306,
    username: "root",
    password: "",
    database: "test 2",
    entities: [CounterUser,Counter,NormalUser,Issue,Notification],
    logging: false,
    synchronize: false,
    
})

const SERVER_PORT = process.env.SERVER_PORT ? Number(process.env.SERVER_PORT) :1337;

const SECRET = process.env.SECRET ? Number(process.env.SECRET) :1337 ;

export const config = {
    server:{
        port: SERVER_PORT  
    }
  
}