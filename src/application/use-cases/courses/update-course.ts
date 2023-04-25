import { Injectable } from '@nestjs/common';
import { Course } from '../../entities/courses';
import { CourseRepository } from '../../repositories/course-repository';
import { CourseNotFound } from './erros/course-not-found';

interface updateCourseRequest {
  id: number;
  name: string;
  content: string;
  period: string;
  teacher_name: string;
}

interface updateCourseResponse {
  course: Course;
}

@Injectable()
export class UpdateCourse {
  constructor(private courseRepository: CourseRepository) {}

  async execute({
    id,
    name,
    content,
    period,
    teacher_name,
  }: updateCourseRequest): Promise<updateCourseResponse> {
    const filteredCourse = await this.courseRepository.findById(+id);
    if (!filteredCourse) {
      throw new CourseNotFound();
    }
    const course = new Course({ name, content, period, teacher_name });

    await this.courseRepository.update(id, course);
    return { course };
  }
}
