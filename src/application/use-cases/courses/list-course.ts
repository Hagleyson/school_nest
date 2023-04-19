import { Injectable } from '@nestjs/common';
import { Course } from '../../entities/courses';
import { CourseRepository } from '../../repositories/course-repository';

interface listCourseResponse {
  course: Course[];
}

@Injectable()
export class ListCourse {
  constructor(private courseRepository: CourseRepository) {}

  async execute(): Promise<listCourseResponse> {
    const course = await this.courseRepository.findAll();
    return { course };
  }
}
