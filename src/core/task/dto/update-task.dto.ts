import { IsEnum, IsNotEmpty } from 'class-validator';
import { TaskChangeStatus } from '../constants';

export class UpdateTaskDto {
  @IsNotEmpty()
  @IsEnum(TaskChangeStatus)
  status: TaskChangeStatus;
}
