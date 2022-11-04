const {genSaltSync, hashSync, compareSync } = require("bcrypt");

const jwt = require("jsonwebtoken");

import {validate} from "class-validator";
import { Request,Response,NextFunction } from "express";

import { AppDataSource } from "../config/config";

import { NormalUser } from "../entity/NormalUser";

module.exports = {
    checkuserToken: (req:Request, res:Response, next:NextFunction) => {

        const userRepository = AppDataSource.getRepository(NormalUser);


        let token = req.headers.authorization;
        if(token){
            console.log("user token",token)
            token = token.slice(7);
            jwt.verify(token, process.env.SECRET, async (err: any, decode:any) => {
                  if(err){
                    res.json({
                        success: 0,
                        message: "Invalid token"
                        
                    });
                    console.log(err)
                  }else{
                   
                    console.log(decode);
                    res.locals.user_id = decode.user_id;
                    
                    //res.locals.jwt = decode;
                    //let user = await userRepository.findOneBy(decode.user_id);
                    //req.body.user = user;
                    //console.log(user);
                    // res.json({token});
                   // res.json({decode});
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