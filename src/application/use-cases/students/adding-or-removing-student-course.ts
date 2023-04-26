import { Injectable } from '@nestjs/common';

import { Student } from '../../entities/student';
import { StudentRepository } from '../../repositories/student-repository';
import { StudentNotFound } from './erros/student-not-found';
import { CourseRepository } from '@application/repositories/course-repository';
import { Course } from '@application/entities/courses';

interface AddingOrRemovingStudentCourseRequest {
  student_id: number;
  newCourses: number[];
  removedCourses: number[];
}

interface createStudentResponse {
  student: Student;
}

@Injectable()
export class AddingOrRemovingStudentCourse {
  constructor(
    private studentRepository: StudentRepository,
    private courseRepository: CourseRepository,
  ) {}

  async execute({
    student_id,
    newCourses,
    removedCourses,
  }: AddingOrRemovingStudentCourseRequest): Promise<createStudentResponse> {
    const student = await this.studentRepository.findById(+student_id);
    if (!student) {
      throw new StudentNotFound();
    }
    const newCoursesModel: Course[] = [];
    for (const iterator of newCourses) {
      newCoursesModel.push(await this.courseRepository.findById(iterator));
    }
    const removedCoursesDB: Course[] = [];
    for (const iterator of removedCourses) {
      removedCoursesDB.push(await this.courseRepository.findById(iterator));
    }

    await this.studentRepository.addingOrRemovingStudentCourse({
      student,
      newCourses: newCoursesModel,
      removedCourses: removedCoursesDB,
    });
    return null;
  }
}
