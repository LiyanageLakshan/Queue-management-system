import "reflect-metadata";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn, } from "typeorm";

import {Issue} from "./Issue";


import {Notification} from "./Notification";

@Entity()
export class NormalUser {

   @PrimaryGeneratedColumn()
   user_id: number;
   
   @Column()
   user_fname: string;

   @Column()
   user_email: string ;

 
   @Column()
   user_password: string;

   @OneToMany(()=> Issue, (issue) => issue.nuser)
   issue: Issue ;

  @OneToMany(()=> Notification, (notifi) => notifi.nuser)
  notifi: Notification ;

 
}