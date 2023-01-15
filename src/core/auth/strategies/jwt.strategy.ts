import { UserRepository } from 'src/core/user/user.repository';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Request } from 'express';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(private readonly userRepository: UserRepository) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        ExtractJwt.fromAuthHeaderAsBearerToken(),
        JwtStrategy.extractJwtFromCookies,
      ]),
      ignoreExpiration: true,
      secretOrKey: process.env.JWT_SECRET,
    });
  }

  private static extractJwtFromCookies(req: Request): string | null {
    if (req?.cookies && req.cookies['jwt']) {
      return req.cookies['jwt'];
    }
    return null;
  }

  async validate({ id }: { id: number }) {
    const user = await this.userRepository.findOneBy({ id });

    if (!user) throw new UnauthorizedException();

    return user;
  }
}
