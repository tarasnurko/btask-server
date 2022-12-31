import {
  ArrayMaxSize,
  ArrayMinSize,
  ArrayNotEmpty,
  IsArray,
  IsEnum,
  IsNotEmpty,
} from 'class-validator';
import { TaskChangeStatus, TaskStatus } from '../constants';

export class UpdateTaskDto {
  @IsNotEmpty()
  @IsEnum(TaskChangeStatus)
  status: TaskChangeStatus;
}
