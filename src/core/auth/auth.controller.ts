import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './dto';
import { JwtAuthGuard } from './guards';
import { Request, Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  async signup(
    @Body() authDto: AuthDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const data = await this.authService.signup(authDto);
    res.cookie('jwt', data.token, { httpOnly: true });
    return data;
  }

  @Post('login')
  async login(
    @Body() authDto: AuthDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const data = await this.authService.login(authDto);
    res.cookie('jwt', data.token, { httpOnly: true });
    return data;
  }

  @Post('logout')
  @UseGuards(JwtAuthGuard)
  async logout(@Res({ passthrough: true }) res: Response) {
    res.cookie('jwt', null, { httpOnly: true });
    return null;
  }

  @Get('get')
  @UseGuards(JwtAuthGuard)
  async get(@Req() req: Request) {
    console.log(req.user);
    return { a: 'dfdfdf' };
  }
}
