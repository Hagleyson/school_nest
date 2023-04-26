import { Course } from '@application/entities/courses';
import { Student } from '@application/entities/student';

export interface AddingOrRemovingStudentCourseRequest {
  student: Student;
  newCourses: Course[];
  removedCourses: Course[];
}
