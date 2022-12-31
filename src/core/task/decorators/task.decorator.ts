import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { TaskEntity } from '../task.entity';

type TypeData = keyof TaskEntity;

export const Task = createParamDecorator(
  (data: TypeData, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const task: TaskEntity = request.task;

    return data ? task?.[data] : task;
  },
);
