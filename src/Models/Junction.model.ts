import { flatMap } from "lodash";
import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn, ManyToOne, OneToMany } from "typeorm";
import { Area } from "./Area.model";
import { Channel } from "./Channel.model";
import { Fixtime } from "./Fixtime.model";
import { Flashing } from "./Flashing.model";
import { Plan } from "./Plan.model";

@Entity()
export class Junction {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 64 })
    name: string;

    @Column({ type: "float", default: 0.00 })
    latitude: number;

    @Column({ type: "float", default: 0.00 })
    longitude: number;

    @Column({ type: "int" })
    number_channel: number;

    @ManyToOne(() => Area, area => area.junction)
    area: Area

    @OneToMany(() => Channel, channel => channel.junction)
    channel: Channel[]

    @OneToMany(() => Flashing, flashing => flashing.junction)
    flashing_plan: Flashing[]

    @OneToMany(() => Fixtime, fixtime => fixtime.junction)
    fixtime_plan: Fixtime

    @OneToMany(() => Plan, plan => plan.junction)
    plan: Plan[]
    // @Column({ type: "float" })
    // area_id: number;
}

