import { Course } from '@application/entities/courses';
import { IMeta } from './meta';

export interface IListAllCorse {
  meta: IMeta;
  courses: Course[];
}
export interface IParamsListAllCourse {
  page: number;
  perPage: number;
}
