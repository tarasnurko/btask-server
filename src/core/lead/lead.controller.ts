import {
  Body,
  Param,
  Controller,
  Get,
  Post,
  Delete,
  UseGuards,
  ParseIntPipe,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards';
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
}
