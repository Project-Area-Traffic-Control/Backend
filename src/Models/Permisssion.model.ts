import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable, ManyToOne, JoinColumn } from "typeorm";
import { User } from "./User.model";


export enum PermissionName {
    CONFIG_JUNCTION = "CONFIG_JUNCTION",
    CONFIG_CHANNEL = "CONFIG_CHANNEL",
    CONFIG_PLAN = "CONFIG_PLAN",
    CONFIG_FIXTIME = "CONFIG_FIXTIME",
    CONTROL = "CONTROL",
    MONITOR = "MONITOR",
    STATISTIC = "STATISTIC"
}

@Entity()
export class Permission {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: "enum", enum: PermissionName })
    name: PermissionName;

    @Column({ default: false })
    view: boolean;

    @Column({ default: false })
    edit: boolean;

    @Column({ default: false })
    delete: boolean;

    @Column({ default: false })
    export: boolean;

    @ManyToOne(() => User, user => user.permissions)
    // @JoinColumn({name: "uid"})
    user: User;
}