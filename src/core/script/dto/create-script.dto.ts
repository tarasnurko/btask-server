import { IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { ScriptSource } from '../constants';

export class CreateScriptDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsEnum(ScriptSource)
  source: ScriptSource;

  @IsNotEmpty()
  @IsString()
  link: string;
}
