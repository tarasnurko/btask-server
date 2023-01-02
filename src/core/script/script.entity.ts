import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { UserEntity } from '../user/user.entity';
import { ScriptSource } from './constants';

@Entity('script')
export class ScriptEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({
    type: 'enum',
    enum: ScriptSource,
  })
  source: ScriptSource;

  @Column()
  link: string;

  @Column()
  userId: number;

  @ManyToOne(() => UserEntity, (user) => user.scripts, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'userId' })
  user: UserEntity;
}
