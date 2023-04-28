import {
  AddingOrRemovingStudentCourseRequest,
  IListAllStudent,
  IParamsListAllStudent,
} from 'src/shared/interfaces';
import { Student } from '../entities/student';

export abstract class StudentRepository {
  abstract create(student: Student): Promise<void>;
  abstract findById(student_id: number): Promise<Student | null>;
  abstract findAll(query?: IParamsListAllStudent): Promise<IListAllStudent>;
  abstract update(id: number, student: Student): Promise<void>;
  abstract delete(student_id: number): Promise<void>;
  abstract findByEmail(email: string): Promise<Student>;
  abstract addingOrRemovingStudentCourse(
    props: AddingOrRemovingStudentCourseRequest,
  ): Promise<any>;
}
