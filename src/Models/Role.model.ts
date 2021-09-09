import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToMany, JoinTable, OneToOne, JoinColumn } from "typeorm";
import { Permission } from "./Permission.model";
import { User } from "./User.model";

@Entity()
export class Role {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 32, unique: true })
    name: string;

    @Column({ length: 255, nullable: true })
    description: string;

    @OneToMany(() => User, user => user.role)
    users: User[];

    @OneToMany(() => Permission, permission => permission.role)
    permissions: Permission[];

}
