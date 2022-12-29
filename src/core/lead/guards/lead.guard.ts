import {
  BadRequestException,
  CanActivate,
  ExecutionContext,
  Injectable,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { LeadRepository } from '../lead.repository';

@Injectable()
export class LeadGuard implements CanActivate {
  constructor(
    @InjectRepository(LeadRepository)
    private leadRepository: LeadRepository,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const { leadId } = request.params;

    const lead = await this.leadRepository.findOneBy({ id: leadId });

    if (!lead) {
      throw new BadRequestException('No lead found with that id');
    }

    if (lead.userId !== request.user.id) {
      throw new BadRequestException('Lead is not belongs to user');
    }

    request.lead = lead;

    return true;
  }
}
