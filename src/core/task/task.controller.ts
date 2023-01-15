import { Controller, Get, Patch, UseGuards, Body } from '@nestjs/common';

import { JwtAuthGuard } from '../auth/guards';
import { User } from '../user/decorators';
import { Task } from './decorators';
import { UpdateTaskDto } from './dto';
import { TaskGuard } from './guards';
import { TaskEntity } from './task.entity';
import { TaskService } from './task.service';

@Controller('tasks')
@UseGuards(JwtAuthGuard)
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Get()
  async getNextTasks(@User('id') userId: number) {
    return await this.taskService.getNextTasks(userId);
  }

  @Patch(':taskId')
  @UseGuards(TaskGuard)
  async updateTask(
    @Task() task: TaskEntity,
    @Body() updateTaskDto: UpdateTaskDto,
  ) {
    return await this.taskService.updateTask({ task, updateTaskDto });
  }
}
