import { Module } from '@nestjs/common';
import { StudentController } from '../controllers/student.controller';
import { StudentModuleDb } from '@infra/database/student/student.module';
import {
  CreateStudent,
  ListStudent,
  ShowStudents,
  UpdateStudent,
  DeleteStudents,
} from '@application/use-cases';

@Module({
  imports: [StudentModuleDb],
  controllers: [StudentController],
  providers: [
    CreateStudent,
    ShowStudents,
    ListStudent,
    UpdateStudent,
    DeleteStudents,
  ],
})
export class StudentModule {}
