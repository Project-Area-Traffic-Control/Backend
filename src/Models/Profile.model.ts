import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn } from "typeorm";
import { User } from "./User.model";

@Entity()
export class Profile {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 45, nullable: true })
    firstname: string;

    @Column({ length: 45, nullable: true })
    lastname: string;

    @Column({ length: 45, nullable: true })
    email: string;

    @Column({ length: 100, nullable: true })
    address: string;

    @Column({ length: 45, nullable: true })
    tel: string;

    @Column({ type: "longblob", select: false, nullable: true })
    image: string;

    @OneToOne(() => User, user => user.profile)
    @JoinColumn({name: "uid"})
    uid: number;
}