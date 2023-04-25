import { Injectable } from '@nestjs/common';
import { CourseRepository } from '../../repositories/course-repository';
import { CourseNotFound } from './erros/course-not-found';

interface deleteCourseRequest {
  id: number;
}
@Injectable()
export class DeleteCourse {
  constructor(private courseRepository: CourseRepository) {}
  async execute({ id }: deleteCourseRequest): Promise<void> {
    const course = await this.courseRepository.findById(id);
    if (!course) {
      throw new CourseNotFound();
    }
    await this.courseRepository.delete(id);
  }
}
