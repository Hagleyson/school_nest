import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { IAutRequest } from './interfaces/AutRequest';
import { IsPublic } from './decorators/is-public.decorator';
import { RtGuard } from './guards/rt-jwt-auth.guard';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @HttpCode(HttpStatus.OK)
  @UseGuards(LocalAuthGuard)
  @IsPublic()
  async login(@Request() req: IAutRequest) {
    return this.authService.login(req.user);
  }

  @IsPublic()
  @UseGuards(RtGuard)
  @Post('refresh')
  @HttpCode(HttpStatus.OK)
  refreshTokens(@Request() rq): Promise<any> {
    return this.authService.refreshTokens(rq.user);
  }

  @HttpCode(HttpStatus.OK)
  @Post('logout')
  logout(@Request() rq): Promise<unknown> {
    return this.authService.logout(rq.user);
  }
}
