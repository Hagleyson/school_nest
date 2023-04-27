import { Injectable } from '@nestjs/common';

import { Student } from '../../entities/student';
import { StudentRepository } from '../../repositories/student-repository';
import { StudentNotFound } from './erros/student-not-found';
import { CourseRepository } from '@application/repositories/course-repository';
import { Course } from '@application/entities/courses';

interface AddingOrRemovingStudentCourseRequest {
  student_id: number;
  new_courses: number[];
  removed_courses: number[];
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
    new_courses,
    removed_courses,
  }: AddingOrRemovingStudentCourseRequest): Promise<createStudentResponse> {
    const student = await this.studentRepository.findById(+student_id);
    if (!student) {
      throw new StudentNotFound();
    }
    const newCoursesModel: Course[] = [];
    for (const iterator of new_courses) {
      newCoursesModel.push(await this.courseRepository.findById(iterator));
    }
    const removedCoursesDB: Course[] = [];
    for (const iterator of removed_courses) {
      removedCoursesDB.push(await this.courseRepository.findById(iterator));
    }

    removedCoursesDB.forEach((element) => {
      student.remove_course(element);
    });
    newCoursesModel.forEach((element) => {
      student.add_course(element);
    });

    return this.studentRepository.addingOrRemovingStudentCourse({
      student,
    });
  }
}
