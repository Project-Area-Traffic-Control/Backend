import { Entity, OneToMany, Column, OneToOne, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Flashing } from "./Flashing.model";
import { Junction } from "./Junction.model";
import { Phase } from "./Phase.model";
import { Vehicle } from "./Vehicle.model";

@Entity()
export class Channel {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 100 })
    name: string;

    @Column({ type: 'int', default: 0 })
    number_lane: number;

    @Column({ type: 'int' })
    order: number

    @ManyToOne(() => Junction, junction => junction.channel)
    junction: Junction

    @OneToMany(() => Phase, phase => phase.channel)
    phase: Phase[]

    @OneToMany(() => Flashing, flashing => flashing.channel)
    flashing_plan: Flashing[]

    @OneToMany(() => Vehicle, vehicle => vehicle.channel)
    vehicle: Vehicle[]
}