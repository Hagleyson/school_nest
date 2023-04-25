import { Module } from '@nestjs/common';

import { CoursesController } from '../controllers/course.controller';
import { CourseModuleDb } from '@infra/database/courses/course-db.module';

import {
  CreateCourse,
  DeleteCourse,
  ListCourse,
  ShowCourse,
  UpdateCourse,
} from '@application/use-cases';

@Module({
  imports: [CourseModuleDb],
  controllers: [CoursesController],
  providers: [CreateCourse, DeleteCourse, ListCourse, ShowCourse, UpdateCourse],
})
export class CourseModule {}
