import { join } from "lodash";
import { Entity, OneToMany, Column, OneToOne, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Fixtime } from "./Fixtime.model";
import { Junction } from "./Junction.model";
import { Pattern } from "./Pattern.model";

@Entity()
export class Plan {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 100, unique: true })
    name: string;

    @Column({ type: 'int' })
    yellow_time: number;

    @Column({ type: 'int' })
    delay_red_time: number;

    @ManyToOne(() => Junction, junction => junction.plan)
    junction: Junction

    @OneToMany(() => Fixtime, fixtime => fixtime.plan)
    // @JoinColumn({ name: "fixtime_id" })
    fixtime_id: Fixtime[];

    @OneToMany(() => Pattern, pattern => pattern.plan)
    pattern: Pattern[]
}