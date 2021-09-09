import { Entity, PrimaryGeneratedColumn, Column, PrimaryColumn } from "typeorm";

@Entity()
export class License {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 16 })
    license: string;

    @Column({ length: 16 })
    province: string;

    @Column()
    isBlacklist: boolean;

    @Column({ length: 255, nullable: true })
    description: string;

    @Column({ default: true })
    active: boolean;
}
