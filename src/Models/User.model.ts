import { profile } from "console";
import { Entity, OneToMany, Column, OneToOne, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { AlertHistory } from "./AlertHistory.model";

import { Profile } from "./Profile.model";
import { Role } from "./Role.model";

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

    @ManyToOne(() => Role, role => role.users)
    role: number;

    @OneToOne(() => Profile, profile => profile.uid) // specify inverse side as a second parameter
    profile: Profile;

    @OneToMany(() => AlertHistory, alertHistory => alertHistory.user_accept)
    alert_historys: AlertHistory[];

}
