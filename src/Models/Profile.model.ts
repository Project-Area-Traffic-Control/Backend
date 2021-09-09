import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn } from "typeorm";
import { User } from "./User.model";

@Entity()
export class Profile {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 32, nullable: true })
    firstname: string;

    @Column({ length: 32, nullable: true })
    lastname: string;

    @Column({ length: 32, nullable: true })
    email: string;

    @OneToOne(() => User, user => user.profile)
    @JoinColumn({name: "uid"})
    uid: number;
}
