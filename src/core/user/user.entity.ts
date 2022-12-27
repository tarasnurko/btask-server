import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { LeadEntity } from '@/core/lead/lead.entity';

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
}
