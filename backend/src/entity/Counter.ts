import "reflect-metadata";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToMany, OneToMany, OneToOne, PrimaryGeneratedColumn, } from "typeorm";

import {CounterUser} from  "./CounterUser";
import {Issue} from  "./Issue";


@Entity("counter")
export class Counter {
 
   @PrimaryGeneratedColumn()
   counter_id: number;
   
   @Column()
   counter_name: string;

   @Column({default: 0})
   current_token: number;

   @Column({default:0})
   next_token: number;

   @Column({default:0})
   last_token: number;

   @Column({default:0})
   status: boolean;

   @CreateDateColumn({type:"timestamp", default:()=>"CURRENT_TIMESTAMP(6)"})
  created_at: Date;

  @CreateDateColumn({type:"timestamp", default:()=>"CURRENT_TIMESTAMP(6)", onUpdate: "CURRENT_TIMESTAMP(6)"})
  updated_at: Date;
  
 
  @OneToMany(() => Issue, (issue) => issue.counter)
  issue: Issue ;

  @OneToOne(() => CounterUser, (counteruser) =>counteruser.counter)
  @JoinColumn()
  counteruser: Counter ;

 
}