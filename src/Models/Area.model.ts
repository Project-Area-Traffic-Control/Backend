import { join } from "lodash";
import { Entity, OneToMany, Column, OneToOne, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Admin } from "./Admin.model";
import { Junction } from "./Junction.model";
import { User } from "./User.model";
@Entity()
export class Area {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 100, unique: true })
    name: string;
        
    @OneToMany(() => User, user => user.area)
    user: User[]

    @OneToMany(()=> Junction, junction => junction.area)
    junction: Junction[]

    @OneToOne(()=> Admin, admin => admin.area)
    @JoinColumn({name: 'admin_id'})
    admin_id: number
}