import "reflect-metadata";
import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn, } from "typeorm";

import { Counter} from "./Counter";

import { Issue} from "./Issue";


@Entity('counter_user')
export class CounterUser {
  
   @PrimaryGeneratedColumn()
   counter_u_id: number;
   
   @Column()
   counter_u_name: string;

   @Column()
   counter_email: string ;

   @Column()
   counter_contact: number;

   @Column()
   counter_password: string;

   @OneToOne(() => Counter, (counter) =>counter.counteruser)
   counter: Counter ;


}