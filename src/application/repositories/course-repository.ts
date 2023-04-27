import {
  IListAllCorse,
  IParamsListAllCourse,
} from 'src/shared/interfaces/course';
import { Course } from '../entities/courses';

export abstract class CourseRepository {
  abstract create(course: Course): Promise<void>;
  abstract findById(course_id: number): Promise<Course | null>;
  abstract findAll(query?: IParamsListAllCourse): Promise<IListAllCorse>;
  abstract update(id: number, course: Course): Promise<void>;
  abstract delete(course_id: number): Promise<void>;
}
