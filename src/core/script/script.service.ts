import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateScriptDto } from './dto';
import { ScriptEntity } from './script.entity';
import { ScriptRepository } from './script.repository';

@Injectable()
export class ScriptService {
  constructor(
    @InjectRepository(ScriptRepository)
    private readonly scriptRepository: ScriptRepository,
  ) {}

  async getScripts(userId: number): Promise<ScriptEntity[]> {
    const scripts = await this.scriptRepository.find({
      where: { userId },
      order: { source: 'ASC' },
    });

    return scripts;
  }

  async createScript({
    userId,
    createScriptDto,
  }: {
    userId: number;
    createScriptDto: CreateScriptDto;
  }): Promise<ScriptEntity> {
    const { name, source, link } = createScriptDto;

    const oldScript = await this.scriptRepository.findOneBy({ userId, name });

    if (oldScript) {
      throw new BadRequestException('Script with that name already exist');
    }

    const script = this.scriptRepository.create({ name, source, link, userId });

    await script.save();

    return script;
  }

  async deleteScript({
    userId,
    scriptId,
  }: {
    userId: number;
    scriptId: number;
  }): Promise<void> {
    const script = await this.scriptRepository.findOneBy({
      id: scriptId,
      userId,
    });

    if (!script) {
      throw new BadRequestException('No script found with that id');
    }

    await script.remove();
  }
}
