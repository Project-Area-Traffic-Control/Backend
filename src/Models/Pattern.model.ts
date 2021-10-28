import { Console } from "console";
import { join } from "lodash";
import { Entity, OneToMany, Column, OneToOne, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

export enum PatternName {
    PATTERN_1_4_WAYS = "PATTERN_1_4_WAYS",
    PATTERN_2_4_WAYS = "PATTERN_2_4_WAYS",
    PATTERN_3_4_WAYS = "PATTERN_3_4_WAYS",
    PATTERN_4_4_WAYS = "PATTERN_4_4_WAYS",
    PATTERN_5_4_WAYS = "PATTERN_5_4_WAYS",
    PATTERN_6_4_WAYS = "PATTERN_6_4_WAYS",
    PATTERN_7_4_WAYS = "PATTERN_7_4_WAYS",
    PATTERN_8_4_WAYS = "PATTERN_8_4_WAYS",
    PATTERN_1_3_WAYS = "PATTERN_1_3_WAYS",
    PATTERN_2_3_WAYS = "PATTERN_2_3_WAYS",
    PATTERN_3_3_WAYS = "PATTERN_3_3_WAYS",
    PATTERN_1_5_WAYS = "PATTERN_1_5_WAYS",
    PATTERN_2_5_WAYS = "PATTERN_2_5_WAYS"
}

@Entity()
export class Pattern {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'enum', enum: PatternName })
    pattern: PatternName;

    @Column({ type: 'int'})
    order: number;

    @Column({ type: 'int'})
    duration: number;

    @Column({ type: 'int'})
    plan_id: number;
        
}