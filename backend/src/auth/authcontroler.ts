const {genSaltSync, hashSync, compareSync } = require("bcrypt");

const jwt = require("jsonwebtoken");

import {validate} from "class-validator";
import { Request,Response,NextFunction } from "express";

import { AppDataSource } from "../config/config";

import { CounterUser } from "../entity/CounterUser";

module.exports = {
    checkToken: (req:Request, res:Response, next:NextFunction) => {

        const counterRepository = AppDataSource.getRepository(CounterUser);


        let token = req.headers.authorization;
        if(token){
            token = token.slice(7);
            jwt.verify(token, process.env.SECRET, async (err: any, decode:any) => {
                  if(err){
                    res.json({
                        success: 0,
                        message: "Invalid token"
                    });
                  }else{
                    console.log(decode);
                    res.locals.counter_u_id = decode.counter_u_id;

                    //res.locals.jwt = decode;
                    //let counter = await counterRepository.findOneBy(decode.counter_u_id);
                    //res.locals.counter = counter;
                    next();
                  }
            });

        }else{
            res.json({
                success:0,
                message:"Access denied! unauthorized user"
            });
        }
    },


}