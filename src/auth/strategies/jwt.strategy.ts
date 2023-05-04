import {
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

import { UserPayload } from '../interfaces/UserPayload';
import { UserFromJwt } from '../interfaces/UserFromJwt';
import { PrismaService } from '@infra/database/prisma.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private prismaService: PrismaService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET,
    });
  }

  async validate(payload: UserPayload): Promise<UserFromJwt> {
    const userToken = await this.prismaService.tokens.findFirst({
      where: { user_email: payload.email },
    });
    if (!userToken) {
      throw new UnauthorizedException('access denied');
    }
    return {
      id: payload.sub,
      email: payload.email,
      name: payload.name,
    };
  }
}
