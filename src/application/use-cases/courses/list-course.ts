import { Injectable } from '@nestjs/common';
import { Course } from '../../entities/courses';
import { CourseRepository } from '../../repositories/course-repository';
import {
  IListAllCorse,
  IParamsListAllCourse,
} from 'src/shared/interfaces/course';

@Injectable()
export class ListCourse {
  constructor(private courseRepository: CourseRepository) {}

  async execute(query?: IParamsListAllCourse): Promise<IListAllCorse> {
    return this.courseRepository.findAll(query);
  }
}
