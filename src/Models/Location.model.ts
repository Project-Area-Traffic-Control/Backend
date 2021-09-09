import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Device } from "./Device.model";

@Entity()
export class Location {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 32, unique: true })
    name: string;

    @Column({ type: "float" })
    latitude: number;

    @Column({ type: "float" })
    longgitude: number;

    @OneToMany(() => Device, device => device.location)
    device: Device[];

}
