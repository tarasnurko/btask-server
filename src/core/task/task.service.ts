import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TaskChangeStatus, TaskStatus } from './constants';
import { UpdateTaskDto } from './dto';
import { TaskEntity } from './task.entity';
import { TaskRepository } from './task.repository';

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(TaskRepository)
    private readonly taskRepository: TaskRepository,
  ) {}

  async getNextTasks(userId: number) {
    const tasks = await this.taskRepository.find({
      where: {
        userId,
        status: TaskStatus.Next,
      },
      relations: {
        lead: true,
      },
    });

    return tasks;
  }

  async updateTask({
    task,
    updateTaskDto,
  }: {
    task: TaskEntity;
    updateTaskDto: UpdateTaskDto;
  }): Promise<TaskEntity> {
    const { status: changeStatus } = updateTaskDto;

    if (task.status !== TaskStatus.Next) {
      throw new BadRequestException('You can not change not next task');
    }

    if (changeStatus === TaskChangeStatus.Deleted) {
      task.status = TaskStatus.Deleted;
      await task.save();
    } else if (changeStatus === TaskChangeStatus.Done) {
      task.status = TaskStatus.Done;
      await task.save();

      if (task.order !== 5) {
        const nextTask = await this.taskRepository.findOneBy({
          leadId: task.leadId,
          order: task.order + 1,
        });

        nextTask.status = TaskStatus.Next;
        await nextTask.save();
      }
    }

    return task;
  }
}
