import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToOne } from "typeorm";
import { User } from "./User.model";

export enum StatusAlertHistory {
    UNACCEPT = 'UNACCEPT',
    ACCEPT = 'ACCEPT',
}


@Entity()
export class AlertHistory {

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

    @Column({ type: "enum", enum: StatusAlertHistory })
    status: StatusAlertHistory;

    @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
    create_time: Date;

    @ManyToOne(() => User, user => user.alert_historys)
    user_accept: User;
}