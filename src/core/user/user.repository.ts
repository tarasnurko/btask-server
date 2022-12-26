import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { UserEntity } from './user.entity';

@Injectable()
export class UserRepository extends Repository<UserEntity> {
  constructor(private dataSource: DataSource) {
    super(UserEntity, dataSource.createEntityManager());
  }

  async createUser({
    email,
    password,
  }: {
    email: string;
    password: string;
  }): Promise<UserEntity> {
    const user = this.create({ email, password });
    await user.save();
    return user;
  }
}
