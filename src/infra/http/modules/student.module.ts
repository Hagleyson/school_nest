import { Module } from '@nestjs/common';
import { StudentController } from '../controllers/student.controller';
import { StudentModuleDb } from '@infra/database/student/student.module';
import {
  CreateStudent,
  ListStudent,
  ShowStudents,
  UpdateStudent,
  DeleteStudents,
  AddingOrRemovingStudentCourse,
  FindByEmailUseCase,
} from '@application/use-cases';
import { CourseModuleDb } from '@infra/database/courses/course-db.module';

@Module({
  imports: [StudentModuleDb, CourseModuleDb],
  controllers: [StudentController],
  providers: [
    CreateStudent,
    ShowStudents,
    ListStudent,
    UpdateStudent,
    DeleteStudents,
    AddingOrRemovingStudentCourse,
    FindByEmailUseCase,
  ],
})
export class StudentModule {}
