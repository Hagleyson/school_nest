import { Module } from '@nestjs/common';

import { StudentModule } from '@infra/http/modules/student.module';

@Module({
  imports: [StudentModule],
})
export class AppModule {}
