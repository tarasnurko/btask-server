import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TaskStatus } from '../task/constants';
import { TaskRepository } from '../task/task.repository';

interface Failure {
  order: number;
  count: number;
  percentage?: number;
}

interface Stats {
  overall: number;
  failures: Failure[];
}

@Injectable()
export class AnalyticsService {
  constructor(
    @InjectRepository(TaskRepository)
    private readonly taskRepository: TaskRepository,
  ) {}

  async getFailuteAnalytics(userId: number) {
    const stats: Stats = { overall: 0, failures: [] };

    for (let i = 1; i <= 5; i++) {
      const count = await this.taskRepository.countBy({
        userId,
        status: TaskStatus.Deleted,
        order: i,
      });

      stats.failures.push({ order: i, count });
      stats.overall += count;
    }

    for (const failure of stats.failures) {
      const percentage = failure.count / stats.overall;

      failure.percentage =
        Math.round((percentage + Number.EPSILON) * 100) / 100;
    }

    return stats;
  }
}
