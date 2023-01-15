import {
  Body,
  Controller,
  Get,
  Post,
  Delete,
  UseGuards,
  Patch,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards';
import { ChangeTasksDto } from '../task/dto';
import { User } from '../user/decorators';
import { Lead } from './decorators';
import { CreateLeadDto } from './dto';
import { LeadGuard } from './guards';
import { LeadService } from './lead.service';

@Controller('leads')
@UseGuards(JwtAuthGuard)
export class LeadController {
  constructor(private readonly leadService: LeadService) {}

  @Get()
  async getAll(@User('id') userId: number) {
    return await this.leadService.getAllLeads(userId);
  }

  @Post()
  async createLead(
    @User('id') userId: number,
    @Body() createLeadDto: CreateLeadDto,
  ) {
    return await this.leadService.createLead({ userId, createLeadDto });
  }

  @Delete(':leadId')
  @UseGuards(LeadGuard)
  async deleteLead(@Lead('id') leadId: number) {
    return await this.leadService.deleteLead(leadId);
  }

  @Get(':leadId/tasks')
  @UseGuards(LeadGuard)
  async getLeadTasks(@Lead('id') leadId: number) {
    return await this.leadService.getLeadTasks(leadId);
  }

  @Patch(':leadId/tasks')
  @UseGuards(LeadGuard)
  async changeTasks(
    @Lead('id') leadId: number,
    @Body() changeTasksDto: ChangeTasksDto,
  ) {
    return await this.leadService.changeTasks({ leadId, changeTasksDto });
  }
}
