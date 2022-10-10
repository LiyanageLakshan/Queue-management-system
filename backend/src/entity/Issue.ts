import "reflect-metadata";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToMany, ManyToOne, OneToOne, PrimaryGeneratedColumn, } from "typeorm";

import {Counter} from "./Counter";

import {CounterUser} from "./CounterUser";

import {NormalUser} from "./NormalUser";




export enum StatusFormat { PENDING = 'pending',DONE='done', CANCEL='cancel',
ONGOIN='ongoing'}

@Entity()
export class Issue {

   @PrimaryGeneratedColumn()
   issue_id: number;
   
   @Column()
   u_contact_no: number;

   @Column()
   issue: string ;

   
   @Column()
   queue_no: number;

   @Column({
    type: 'enum',
    enum: StatusFormat,
    default: StatusFormat.PENDING
   })
   status: StatusFormat;

   @CreateDateColumn({type:"timestamp", default:()=>"CURRENT_TIMESTAMP(6)"})
   created_at: Date;
 
   @CreateDateColumn({type:"timestamp", default:()=>"CURRENT_TIMESTAMP(6)", onUpdate: "CURRENT_TIMESTAMP(6)"})
   updated_at: Date;

   @ManyToOne(() => Counter,(counter:Counter) => counter.issue)
   @JoinColumn()
   counter: Counter ;


   @ManyToOne(() => NormalUser, (nuser) => nuser.issue)
   @JoinColumn()
   nuser: NormalUser;


 


}