import {
  ArrayMaxSize,
  ArrayMinSize,
  ArrayNotEmpty,
  IsArray,
  IsEnum,
} from 'class-validator';
import { TaskStatus } from '../constants';

export class ChangeTasksDto {
  @IsArray()
  @ArrayNotEmpty()
  @ArrayMaxSize(5)
  @ArrayMinSize(5)
  @IsEnum(TaskStatus, { each: true })
  tasks: TaskStatus[];
}
