import { Controller, Get, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards';
import { User } from '../user/decorators';
import { AnalyticsService } from './analytics.service';

@Controller('analytics')
@UseGuards(JwtAuthGuard)
export class AnalyticsController {
  constructor(private readonly analyticsService: AnalyticsService) {}

  @Get('failure')
  async getFailuteAnalytics(@User('id') userId: number) {
    return await this.analyticsService.getFailuteAnalytics(userId);
  }
}
