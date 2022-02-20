import { join } from "lodash";
import { Entity, OneToMany, Column, OneToOne, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { EntitySchemaUniqueOptions } from "typeorm/entity-schema/EntitySchemaUniqueOptions";
import { Channel } from "./Channel.model";
import { Flashing } from "./Flashing.model";
import { Vehicle } from "./Vehicle.model";

export enum TypeName {
    FORWARD = "FORWARD",
    TURN_LEFT = "TURN_LEFT",
    TURN_RIGHT = "TURN_RIGHT",
}

@Entity()
export class Phase {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'enum', enum: TypeName })
    type: TypeName;

    @Column({ type: 'int' })
    port_number: number;

    @ManyToOne(() => Channel, channel => channel.phase)
    channel: Channel

    @OneToMany(() => Flashing, flashing => flashing.phase)
    flashing_plan: Flashing[]

    @OneToMany(() => Vehicle, vehicle => vehicle.phase)
    vehicle: Vehicle[]
    // @Column({ type: 'int' })
    // channel_id: number;

}