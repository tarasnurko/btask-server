import {
  BadRequestException,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';
import { CreateLeadDto } from './dto';

import { LeadEntity } from './lead.entity';
import { LeadRepository } from './lead.repository';

@Injectable()
export class LeadService {
  constructor(
    @InjectRepository(LeadRepository)
    private readonly leadRepository: LeadRepository,
  ) {}

  async getAllLeads(userId: number): Promise<LeadEntity[]> {
    const leads: LeadEntity[] = await this.leadRepository.findBy({ userId });

    return leads;
  }

  async createLead({
    userId,
    createLeadDto,
  }: {
    userId: number;
    createLeadDto: CreateLeadDto;
  }): Promise<LeadEntity> {
    const { minBudget, maxBudget } = createLeadDto;

    if (!minBudget && !maxBudget) {
      throw new BadRequestException('Provide min budget or/and max budget');
    }

    const lead = await this.leadRepository.createLead({
      userId,
      createLeadDto,
    });

    return lead;
  }

  async deleteLead({
    userId,
    leadId,
  }: {
    userId: number;
    leadId: number;
  }): Promise<void> {
    const lead = await this.leadRepository.findOneBy({ id: leadId });

    if (!lead) {
      throw new BadRequestException('No lead found with that id');
    }

    if (lead.userId !== userId) {
      throw new ForbiddenException('Lead is not belongs to current user');
    }

    await lead.remove();
  }
}
