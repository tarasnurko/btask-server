import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import * as bcrypt from 'bcrypt';

import { UserRepository } from '@/core/user/user.repository';

import { AuthDto } from './dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userRepository: UserRepository,
  ) {}

  async signup(authDto: AuthDto) {
    const { email, password } = authDto;

    const user = await this.userRepository.findOneBy({ email });

    if (user) {
      throw new BadRequestException('User with this email is already exist');
    }

    const hashedPassword = await this.hashPassword(password);

    const newUser = await this.userRepository.createUser({
      email,
      password: hashedPassword,
    });

    const token = await this.createJwtToken(newUser.id);

    return {
      id: newUser.id,
      email: newUser.email,
      token,
    };
  }

  async login(authDto: AuthDto) {
    const { email, password } = authDto;

    const user = await this.userRepository.findOne({
      where: { email },
      select: ['id', 'email', 'password'],
    });

    if (!user) {
      throw new NotFoundException('User is not found');
    }

    const isPasswordCorrect = await this.comparePasswords(
      password,
      user.password,
    );

    if (!isPasswordCorrect) {
      throw new UnauthorizedException('Password is not correct');
    }

    const token = await this.createJwtToken(user.id);

    return {
      id: user.id,
      email: user.email,
      token,
    };
  }

  async hashPassword(password: string) {
    const saltOrRounds = 10;
    return await bcrypt.hash(password, saltOrRounds);
  }

  async comparePasswords(
    password: string,
    hashedPassword: string,
  ): Promise<boolean> {
    return await bcrypt.compare(password, hashedPassword);
  }

  async createJwtToken(userId: number): Promise<string> {
    const token = await this.jwtService.signAsync(
      { id: userId },
      {
        expiresIn: `${process.env.JWT_EXPIRES}`,
      },
    );

    return token;
  }
}
