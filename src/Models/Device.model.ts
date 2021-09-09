import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { Location } from "./Location.model";
import { LPR_DB } from "./LPR_DB.model";

@Entity()
export class Device {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 64, unique: true })
    name: string;

    @Column({ length: 16 , nullable: true})
    ip: string;

    @Column({ length: 255, nullable: true })
    description: string;

    @ManyToOne(() => Location, location => location.device)
    location: number;

    @ManyToOne(() => LPR_DB, lpr_db => lpr_db.device)
    lpr_db: LPR_DB;

}
