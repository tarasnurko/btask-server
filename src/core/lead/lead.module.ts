import { Module } from '@nestjs/common';
import { LeadController } from './lead.controller';
import { LeadService } from './lead.service';
import { LeadRepository } from './lead.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LeadEntity } from './lead.entity';

@Module({
  imports: [TypeOrmModule.forFeature([LeadEntity])],
  controllers: [LeadController],
  providers: [LeadService, LeadRepository],
})
export class LeadModule {}
