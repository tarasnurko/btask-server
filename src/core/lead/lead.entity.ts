import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { UserEntity } from '@/core/user/user.entity';
import { LeadSource } from './enums';

@Entity('lead')
export class LeadEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ type: 'enum', enum: LeadSource })
  source: LeadSource;

  @Column({ default: 0 })
  minBudget: number;

  @Column({ default: 100000 })
  maxBudget: number;

  @Column()
  contact: string;

  @Column()
  userId: number;

  @ManyToOne(() => UserEntity, (user) => user.leads)
  @JoinColumn({ name: 'userId' })
  user: UserEntity;
}
