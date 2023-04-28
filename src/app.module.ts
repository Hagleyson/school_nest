import { Module } from '@nestjs/common';

import { StudentModule, CourseModule } from '@infra/http/modules/index';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [StudentModule, CourseModule, AuthModule],
})
export class AppModule {}
