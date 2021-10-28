import { Entity, OneToMany, Column, OneToOne, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Flashing } from "./Flashing.model";
import { Junction } from "./Junction.model";
import { Phase } from "./Phase.model";

@Entity()
export class Channel {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 100, unique: true })
    name: string;

    @Column({ type: 'int' })
    nunmber_lane: number;

    @Column({ type: 'int' })
    order: number

    @ManyToOne(() => Junction, junction => junction.channel)
    junction: Junction

    @OneToMany(() => Phase, phase => phase.channel)
    phase: Phase[]

    @OneToMany(() => Flashing, flashing => flashing.channel)
    flashing_plan: Flashing[]


}