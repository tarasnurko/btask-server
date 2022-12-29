import {
  BadRequestException,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';
import { TaskRepository } from '../task/task.repository';
import { CreateLeadDto } from './dto';

import { LeadEntity } from './lead.entity';
import { LeadRepository } from './lead.repository';

@Injectable()
export class LeadService {
  constructor(
    @InjectRepository(LeadRepository)
    private readonly leadRepository: LeadRepository,
    @InjectRepository(TaskRepository)
    private readonly taskRepository: TaskRepository,
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
  }) {
    const { name, source, nextTask, minBudget, maxBudget, contact } =
      createLeadDto;

    const oldLead = await this.leadRepository.findOneBy({
      name,
      userId,
    });

    if (oldLead) {
      throw new BadRequestException('Lead with this name is already exist');
    }

    if (!minBudget && !maxBudget) {
      throw new BadRequestException('Provide min budget or/and max budget');
    }

    const lead = await this.leadRepository.create({
      name,
      source,
      minBudget,
      maxBudget,
      contact,
      userId,
    });

    await lead.save();

    await this.taskRepository.createAllTasks({
      userId,
      leadId: lead.id,
      nextTask,
    });

    return lead;
  }

  async deleteLead(leadId: number): Promise<void> {
    const lead = await this.leadRepository.findOneBy({ id: leadId });
    await lead.remove();
  }
}
