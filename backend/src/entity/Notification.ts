import "reflect-metadata";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, } from "typeorm";

import { NormalUser } from "./NormalUser";

@Entity()
export class Notification {

   @PrimaryGeneratedColumn()
   not_id: number;
   
   @Column()
   notification: string;


   @ManyToOne(() => NormalUser, (nuser) => nuser.notifi)
   @JoinColumn()
   nuser: NormalUser ;

}