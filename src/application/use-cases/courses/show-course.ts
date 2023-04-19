import { Injectable } from '@nestjs/common';
import { CourseRepository } from '../../repositories/course-repository';
import { CourseNotFound } from './erros/course-not-found';
import { Course } from '../../entities/courses';

interface deleteCourseRequest {
  id: string;
}
interface deleteCourseResponse {
  course: Course;
}
@Injectable()
export class ShowCourse {
  constructor(private courseRepository: CourseRepository) {}
  async execute({ id }: deleteCourseRequest): Promise<deleteCourseResponse> {
    const course = await this.courseRepository.findById(id);
    if (!course) {
      throw new CourseNotFound();
    }
    return { course };
  }
}
