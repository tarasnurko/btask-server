import { BadRequestException, Injectable } from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';
import { TaskStatus } from '../task/constants';
import { ChangeTasksDto } from '../task/dto';
import { TaskEntity } from '../task/task.entity';
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

    const lead = this.leadRepository.create({
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

  async getLeadTasks(leadId: number): Promise<TaskEntity[]> {
    const tasks = await this.taskRepository.find({
      where: { leadId },
      order: { order: 'ASC' },
    });

    return tasks;
  }

  async changeTasks({
    leadId,
    changeTasksDto,
  }: {
    leadId: number;
    changeTasksDto: ChangeTasksDto;
  }): Promise<TaskEntity[]> {
    const { tasks: tasksStatus } = changeTasksDto;

    this.verifyTasksStatus(tasksStatus);

    const tasks = await this.taskRepository.find({
      where: { leadId },
      order: { order: 'ASC' },
    });

    for (const [index, task] of tasks.entries()) {
      task.status = tasksStatus[index];
      await task.save();
    }

    return tasks;
  }

  verifyTasksStatus(tasksStatus: TaskStatus[]) {
    if (tasksStatus[0] === TaskStatus.Inactive) {
      throw new BadRequestException('First task can not be inactive');
    }

    for (let i = 0; i < 5; i++) {
      //Check if done task goes before next task
      if (
        i > 0 &&
        tasksStatus[i] === TaskStatus.Next &&
        tasksStatus[i - 1] !== TaskStatus.Done
      ) {
        throw new BadRequestException('Before next task must be done tasks');
      }

      //Check if done and inactive task is not in after each other
      if (
        i < 4 &&
        tasksStatus[i] === TaskStatus.Done &&
        tasksStatus[i + 1] === TaskStatus.Inactive
      ) {
        throw new BadRequestException(
          'After done task should be done, next or deleted task',
        );
      }

      for (let j = i - 1; j >= 0; j--) {
        // Check if before done/deleted task goes done task
        if (
          i > 0 &&
          (tasksStatus[i] === TaskStatus.Done ||
            tasksStatus[i] === TaskStatus.Deleted) &&
          tasksStatus[j] !== TaskStatus.Done
        ) {
          throw new BadRequestException(
            'Before done/deleted task goes done tasks',
          );
        }
      }

      for (let j = i + 1; j < 5; j++) {
        // Check if after inactive/deleted task goes inactive tasks
        if (
          (tasksStatus[i] === TaskStatus.Inactive ||
            tasksStatus[i] === TaskStatus.Deleted) &&
          tasksStatus[j] !== TaskStatus.Inactive
        ) {
          throw new BadRequestException(
            'After inactive/deleted task goes inactive tasks',
          );
        }
      }
    }
  }
}
