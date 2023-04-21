import { Module } from '@nestjs/common';
import { StudentController } from '../controllers/student.controller';
import { StudentModuleDb } from '@infra/database/student/student.module';
import { CreateStudent } from '@application/use-cases';

@Module({
  imports: [StudentModuleDb],
  controllers: [StudentController],
  providers: [CreateStudent],
})
export class StudentModule {}
