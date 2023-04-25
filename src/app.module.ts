import { Module } from '@nestjs/common';

import { StudentModule, CourseModule } from '@infra/http/modules/index';

@Module({
  imports: [StudentModule, CourseModule],
})
export class AppModule {}
