import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  UseGuards,
  ParseIntPipe,
  Param,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards';
import { User } from '../user/decorators';
import { CreateScriptDto } from './dto';
import { ScriptService } from './script.service';

@Controller('scripts')
@UseGuards(JwtAuthGuard)
export class ScriptController {
  constructor(private readonly scriptService: ScriptService) {}

  @Get()
  async getScripts(@User('id') userId: number) {
    return await this.scriptService.getScripts(userId);
  }

  @Post()
  async createScript(
    @User('id') userId: number,
    @Body() createScriptDto: CreateScriptDto,
  ) {
    return await this.scriptService.createScript({ userId, createScriptDto });
  }

  @Delete(':scriptId')
  async deleteScript(
    @User('id') userId: number,
    @Param('scriptId', ParseIntPipe) scriptId: number,
  ) {
    return await this.scriptService.deleteScript({ userId, scriptId });
  }
}
