import { Injectable } from '@nestjs/common';
import { Course } from '../../entities/courses';
import { CourseRepository } from '../../repositories/course-repository';

interface createCourseRequest {
  name: string;
  content: string;
  period: string;
  teacher_name: string;
}

interface createCourseResponse {
  course: Course;
}

@Injectable()
export class CreateCourse {
  constructor(private courseRepository: CourseRepository) {}

  async execute({
    name,
    content,
    period,
    teacher_name,
  }: createCourseRequest): Promise<createCourseResponse> {
    const course = new Course({ name, content, period, teacher_name });
    await this.courseRepository.create(course);
    return { course };
  }
}
