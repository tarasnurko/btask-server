import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { LeadEntity } from '../lead/lead.entity';
import { TaskEntity } from '../task/task.entity';
import { ScriptEntity } from '../script/script.entity';

@Entity('user')
export class UserEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column({ select: false })
  password: string;

  @OneToMany(() => LeadEntity, (lead) => lead.user, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  leads: LeadEntity[];

  @OneToMany(() => TaskEntity, (task) => task.user, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  tasks: TaskEntity[];

  @OneToMany(() => ScriptEntity, (script) => script.user, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  scripts: ScriptEntity[];
}
