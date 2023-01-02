import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { ScriptEntity } from './script.entity';

@Injectable()
export class ScriptRepository extends Repository<ScriptEntity> {
  constructor(private dataSource: DataSource) {
    super(ScriptEntity, dataSource.createEntityManager());
  }
}
