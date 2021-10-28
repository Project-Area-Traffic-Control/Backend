import { join } from "lodash";
import { Entity, OneToMany, Column, OneToOne, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Fixtime } from "./Fixtime.model";

@Entity()
export class Plan {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 100, unique: true })
    name: string;

    @Column({ type: 'int'})
    yellow_time: number;

    @Column({ type: 'int'})
    delay_red_time: number;
    
    @Column({ type: 'int'})
    junction_id: number;
    
    @OneToOne(()=>Fixtime,fixtime=>fixtime.plan)
    fixtime: Fixtime
}