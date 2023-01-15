import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsString,
  Max,
  Min,
  ValidateIf,
} from 'class-validator';
import { LeadSource } from '../enums';

export class CreateLeadDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsEnum(LeadSource)
  source: LeadSource;

  @ValidateIf((dto) => dto.minBudget)
  @IsNumber({}, { message: 'Provide correct min budget (number)' })
  minBudget: number;

  @ValidateIf((dto) => dto.maxBudget)
  @IsNumber({}, { message: 'Provide correct max budget (number)' })
  maxBudget: number;

  @IsNotEmpty()
  @IsNumber()
  @Min(1)
  @Max(5)
  nextTask: number;

  @IsNotEmpty()
  @IsString()
  contacts: string;
}
