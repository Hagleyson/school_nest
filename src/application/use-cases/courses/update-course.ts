import { Injectable } from '@nestjs/common';
import { Course } from 'src/application/entities/courses';
import { CourseRepository } from 'src/application/repositories/course-repository';

interface createCourseRequest {
  id: string;
  name: string;
  content: string;
  period: string;
  teacher_name: string;
}

interface updateCourseResponse {
  course: Course;
}

@Injectable()
export class UpdateNotification {
  constructor(private courseRepository: CourseRepository) {}

  async execute({
    id,
    name,
    content,
    period,
    teacher_name,
  }: createCourseRequest): Promise<updateCourseResponse> {
    const course = new Course({ name, content, period, teacher_name });
    await this.courseRepository.update(id, course);
    return { course };
  }
}
