import { Course } from '../entities/courses';

export abstract class CourseRepository {
  abstract create(course: Course): Promise<void>;
  abstract findById(course_id: string): Promise<Notification | null>;
  abstract findAll(course_id: string): Promise<Notification | null>;
  abstract update(id: string, course: Course): Promise<void>;
  abstract delete(course_id: string): Promise<void>;
}
