import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { LeadEntity } from '../lead/lead.entity';
import { UserEntity } from '../user/user.entity';
import { TaskStatus, TaskText, TaskTextArr } from './constants';

@Entity('task')
export class TaskEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  order: number;

  @Column({
    type: 'enum',
    enum: TaskTextArr,
  })
  text: TaskText;

  @Column({
    type: 'enum',
    enum: TaskStatus,
    default: TaskStatus.Inactive,
  })
  status: TaskStatus;

  @UpdateDateColumn()
  updatedAt: Date;

  @Column()
  userId: number;

  @ManyToOne(() => UserEntity, (user) => user.tasks, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'userId' })
  user: UserEntity;

  @Column()
  leadId: number;

  @ManyToOne(() => LeadEntity, (lead) => lead.tasks, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'leadId' })
  lead: LeadEntity;
}
