import { Console } from "console";
import { join } from "lodash";
import { Entity, OneToMany, Column, OneToOne, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Junction } from "./Junction.model";
import { Plan } from "./Plan.model";

@Entity()
export class Fixtime {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    start: Date;

    @Column()
    end: Date;

    @ManyToOne(() => Junction, junction => junction.fixtime_plan)
    junction: Junction

    @ManyToOne(() => Plan, plan => plan.fixtime_id)
    plan: Plan

}