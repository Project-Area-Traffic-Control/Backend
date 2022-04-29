import { Entity, OneToMany, Column, OneToOne, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Channel } from "./Channel.model";
import { Junction } from "./Junction.model";
import { Phase } from "./Phase.model";

@Entity()
export class Vehicle {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    create_time: Date;

    @ManyToOne(() => Junction, junction => junction.vehicle)
    junction: Junction

    @ManyToOne(() => Channel, channel => channel.vehicle)
    channel: Channel

    @ManyToOne(() => Phase, phase => phase.vehicle)
    phase: Phase
}