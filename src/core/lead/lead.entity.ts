import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { UserEntity } from '@/core/user/user.entity';
import { LeadSource } from './enums';
import { TaskEntity } from '../task/task.entity';

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
  contacts: string;

  @Column()
  userId: number;

  @OneToMany(() => TaskEntity, (task) => task.lead)
  tasks: TaskEntity[];

  @ManyToOne(() => UserEntity, (user) => user.leads, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'userId' })
  user: UserEntity;
}
