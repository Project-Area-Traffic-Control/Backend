import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable, ManyToOne } from "typeorm";
import { Role } from "./Role.model";

export enum PermissionName {
    REPORT = "REPORT",
    CAMARA_LOCATION = "CAMARA_LOCATION",
    MONITOR = "MONITOR",
    LOCATION_ROUTE = "LOCATION_ROUTE",
    BLACKLIST_WHITELIST = "BLACKLIST_WHITELIST",
    USER_MANAGEMENT = "USER_MANAGEMENT",
    ROLE_MANAGEMENT = "ROLE_MANAGEMENT",
    DEVICE_MANAGEMENT = "DEVICE_MANAGEMENT",
    LOCATION_MANAGEMENT = "LOCATION_MANAGEMENT",
    DATABASE_MANAGEMENT = "DATABASE_MANAGEMENT",
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

    @ManyToOne(() => Role, role => role.permissions)
    role: Role;
}