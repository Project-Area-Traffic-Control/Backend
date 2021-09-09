import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn, PrimaryColumn } from "typeorm";
import { mlpr3_mmr } from "./mlpr3_mmr.model";

@Entity({ schema: "lprdata" })
export class mlpr3 {


    @PrimaryColumn()
    PID: number;

    @Column({ type: "longblob", select: false })
    IMAGE: string;

    @Column()
    DATETIME: Date;

    @Column()
    LICENSEPLATE: string;

    @Column()
    PROVINCE: string

    @Column()
    CAMERA: string

    @Column()
    IP: string

    @OneToOne(() => mlpr3_mmr, mlpr3_mmr => mlpr3_mmr.PID) // specify inverse side as a second parameter
    mlpr3_mmr: mlpr3_mmr;


}
