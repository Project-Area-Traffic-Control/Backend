import { profile } from "console";
import { Entity, OneToMany, Column, OneToOne, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Area } from "./Area.model";
import { Permission } from "./Permisssion.model";
import { Profile } from "./Profile.model";

@Entity()
export class User {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 16, unique: true })
    username: string;

    @Column({ length: 64, select: false })
    password: string;

    @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
    create_time: string;

    @OneToOne(() => Profile, profile => profile.uid)
    profile: Profile;

    @ManyToOne(() => Area, area => area.user)
    area: Area;

    @OneToMany(() => Permission, permission => permission.user)
    permissions: Permission[];


}
