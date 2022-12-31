import {
  BadRequestException,
  CanActivate,
  ExecutionContext,
  Injectable,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TaskRepository } from '../task.repository';

@Injectable()
export class TaskGuard implements CanActivate {
  constructor(
    @InjectRepository(TaskRepository)
    private taskRepository: TaskRepository,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const { taskId } = request.params;

    const task = await this.taskRepository.findOneBy({ id: taskId });

    if (!task) {
      throw new BadRequestException('No task found with that id');
    }

    if (task.userId !== request.user.id) {
      throw new BadRequestException('Task is not belongs to user');
    }

    request.task = task;

    return true;
  }
}
