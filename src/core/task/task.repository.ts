import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { TaskStatus, TaskTextArr } from './constants';
import { TaskEntity } from './task.entity';

@Injectable()
export class TaskRepository extends Repository<TaskEntity> {
  constructor(private dataSource: DataSource) {
    super(TaskEntity, dataSource.createEntityManager());
  }

  async createAllTasks({
    userId,
    leadId,
    nextTask,
  }: {
    userId: number;
    leadId: number;
    nextTask: number;
  }) {
    for (let i = 1; i <= 5; i++) {
      let status: TaskStatus;

      if (i < nextTask) {
        status = TaskStatus.Done;
      } else if (i === nextTask) {
        status = TaskStatus.Next;
      } else {
        status = TaskStatus.Inactive;
      }

      const task = this.create({
        order: i,
        text: TaskTextArr[i - 1],
        status,
        userId,
        leadId,
      });

      await task.save();
    }
  }
}
