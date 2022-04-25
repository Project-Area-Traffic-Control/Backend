import { Console } from "console";
import { join } from "lodash";
import { Entity, OneToMany, Column, OneToOne, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Channel } from "./Channel.model";
import { Junction } from "./Junction.model";
import { Phase } from "./Phase.model";

export enum TypeName {
    RED = "RED",
    YELLOW = "YELLOW",
    GREEN = "GREEN"
}

@Entity()
export class Flashing {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'enum', enum: TypeName })
    type: TypeName;

    @ManyToOne(() => Junction, junction => junction.flashing_plan)
    junction: Junction;

    @ManyToOne(() => Channel, channel => channel.flashing_plan)
    channel: Channel;

    @ManyToOne(() => Phase, phase => phase.flashing_plan)
    phase: Phase;

}