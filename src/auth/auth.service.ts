import { StudentRepository } from '@application/repositories/student-repository';

import { Injectable } from '@nestjs/common';

import * as bcrypt from 'bcrypt';
import { IUser } from './interfaces/AutRequest';
import { UserPayload } from './interfaces/UserPayload';
import { JwtService } from '@nestjs/jwt';
import { UserToken } from './interfaces/UserToken';
@Injectable()
export class AuthService {
  constructor(
    private studentRepository: StudentRepository,
    private jwtService: JwtService,
  ) {}
  async login(user: IUser): Promise<UserToken> {
    const payload: UserPayload = {
      email: user.email,
      name: user.name,
      sub: user.id,
    };
    const jwtToken = this.jwtService.sign(payload);
    return { access_token: jwtToken, name: user.name, email: user.email };
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
}
