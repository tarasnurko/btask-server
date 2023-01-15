import {
  TypeOrmModuleAsyncOptions,
  TypeOrmModuleOptions,
} from '@nestjs/typeorm';

import { UserEntity } from 'src/core/user/user.entity';
import { LeadEntity } from 'src/core/lead/lead.entity';
import { TaskEntity } from 'src/core/task/task.entity';
import { ScriptEntity } from 'src/core/script/script.entity';

const Entities = [UserEntity, LeadEntity, TaskEntity, ScriptEntity];

export const typeOrmAsyncConfig: TypeOrmModuleAsyncOptions = {
  useFactory: async (): Promise<TypeOrmModuleOptions> => {
    return {
      type: 'postgres',
      url: process.env.DATABASE_URL,
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT, 10),
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      ssl: process.env.DATABASE_URL ? true : false,
      entities: Entities,
      synchronize: true,
    };
  },
};
