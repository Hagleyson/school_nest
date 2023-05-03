import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

import { LocalStrategy } from './strategies/local.strategy';

import { StudentModuleDb } from '@infra/database/student/student.module';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './strategies/jwt.strategy';
import { LoginValidationMiddleware } from './middlewares/login-validation.middleware';
import { RtStrategy } from './strategies/rt.jwt.strategy';

@Module({
  imports: [
    StudentModuleDb,
    JwtModule.register({
      secret: process.env.JWT_SECRET,
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy, JwtStrategy, RtStrategy],
})
export class AuthModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoginValidationMiddleware).forRoutes('login');
  }
}
