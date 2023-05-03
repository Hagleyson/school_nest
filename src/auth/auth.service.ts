import { StudentRepository } from '@application/repositories/student-repository';

import { Injectable, UnauthorizedException } from '@nestjs/common';

import * as bcrypt from 'bcrypt';
import { IUser } from './interfaces/AutRequest';
import { UserPayload } from './interfaces/UserPayload';
import { JwtService } from '@nestjs/jwt';
import { UserToken } from './interfaces/UserToken';
import { PrismaService } from '@infra/database/prisma.service';
import { use } from 'passport';
@Injectable()
export class AuthService {
  constructor(
    private studentRepository: StudentRepository,
    private jwtService: JwtService,
    private prismaService: PrismaService,
  ) {}
  async login(user: IUser): Promise<UserToken> {
    const payload: UserPayload = {
      email: user.email,
      name: user.name,
      sub: user.id,
    };
    const access_token = this.jwtService.sign(payload, { expiresIn: '10s' });
    const refresh_token = this.jwtService.sign(payload, { expiresIn: '10m' });

    const tokens = await this.prismaService.tokens.findFirst({
      where: { user_email: user.email },
    });
    if (tokens) {
      await this.prismaService.tokens.update({
        where: { id: tokens.id },
        data: {
          token: access_token,
          refresh_token,
        },
      });
    } else {
      await this.prismaService.tokens.create({
        data: {
          user_email: user.email,
          token: access_token,
          refresh_token,
        },
      });
    }

    return {
      access_token,
      refresh_token,
      name: user.name,
      email: user.email,
    };
  }

  async validateUser(email: string, password: string): Promise<IUser> {
    const user = await this.studentRepository.findByEmail(email);

    if (user) {
      const isPasswordValid = await bcrypt.compare(password, user.password);

      if (isPasswordValid) {
        return {
          email: user.email,
          id: user.id,
          name: user.name,
        };
      }
    }

    throw new Error('Email address or password provided is incorrect. ');
  }

  async refreshTokens(user): Promise<any> {
    const token = await this.prismaService.tokens.findFirst({
      where: { user_email: user.email, refresh_token: user.refresh_token },
    });
    console.log(token);
    if (!token) {
      throw new UnauthorizedException('user not Logged');
    }

    return this.login(user);
  }
}
