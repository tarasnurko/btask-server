import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ScriptController } from './script.controller';
import { ScriptService } from './script.service';
import { ScriptRepository } from './script.repository';
import { ScriptEntity } from './script.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ScriptEntity])],
  controllers: [ScriptController],
  providers: [ScriptService, ScriptRepository],
})
export class ScriptModule {}
