import { profile } from "console";
import { Entity, OneToMany, Column, OneToOne, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Area } from "./Area.model";
import { Profile } from "./Profile.model";

@Entity()
export class Admin {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 64, unique: true})
    email: string;

    @Column({ length: 64, select: false })
    password: string;

    @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
    create_time: string;

    @Column({ length: 64, nullable: true })
    firstname: string;

    @Column({ length: 64, nullable: true })
    lastname: string

    @Column({ length: 64, nullable: true })
    address: string

    @Column({ length: 10, nullable: true })
    tel: string

    @Column({ type: `longblob`, nullable: true })
    image: string

    @OneToOne(() => Area, area => area.admin_id)
    area: Area;


}