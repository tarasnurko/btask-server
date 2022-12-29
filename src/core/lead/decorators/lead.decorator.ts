import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { LeadEntity } from '../lead.entity';

type TypeData = keyof LeadEntity;

export const Lead = createParamDecorator(
  (data: TypeData, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const lead: LeadEntity = request.lead;

    return data ? lead?.[data] : lead;
  },
);
