import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Device } from "./Device.model";

@Entity()
export class LPR_DB {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 64, unique: true })
    name: string;

    @Column({ length: 32 })
    type: string;

    @Column({ length: 32, unique: true })
    host: string;

    @Column()
    port: number;

    @Column({ length: 32 })
    username: string;

    @Column({ length: 64 })
    password: string;

    @Column({ length: 32 })
    database: string;

    @OneToMany(() => Device, device => device.lpr_db)
    device: Device[];

}
