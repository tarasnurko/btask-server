import { BadRequestException, Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { CreateLeadDto } from './dto';
import { LeadSource } from './enums';
import { LeadEntity } from './lead.entity';

@Injectable()
export class LeadRepository extends Repository<LeadEntity> {
  constructor(private dataSource: DataSource) {
    super(LeadEntity, dataSource.createEntityManager());
  }

  async createLead({
    userId,
    createLeadDto,
  }: {
    userId: number;
    createLeadDto: CreateLeadDto;
  }): Promise<LeadEntity> {
    const oldLead = await this.findOneBy({ name: createLeadDto.name, userId });

    if (oldLead) {
      throw new BadRequestException('Lead with this name is already exist');
    }

    const lead = this.create({ ...createLeadDto, userId });
    await lead.save();

    return lead;
  }
}
