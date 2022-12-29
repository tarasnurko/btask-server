import { Controller, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards';
import { TaskService } from './task.service';

@Controller('tasks')
@UseGuards(JwtAuthGuard)
export class TaskController {
  constructor(private readonly taskService: TaskService) {}
}
