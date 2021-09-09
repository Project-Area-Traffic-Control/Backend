import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn, PrimaryColumn } from "typeorm";
import { mlpr3 } from "./mlpr3.model";

@Entity({ schema: "lprdata" })
export class mlpr3_mmr {


    @PrimaryColumn()
    @OneToOne(() => mlpr3, mlpr3 => mlpr3.mlpr3_mmr)
    @JoinColumn({ name: "PID" })
    PID: number;

    @Column({ type: "longblob", select: false })
    image_lc: string;

    @Column()
    model: string;

    @Column()
    color: string;

    @Column()
    category: string
}
