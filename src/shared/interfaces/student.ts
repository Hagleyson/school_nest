import { Course, CourseOnStudent } from '@prisma/client';
import { Student } from '@application/entities/student';
import { IMeta } from './IMeta';

export type CourseOnStudentModel = {
  course: Course;
} & CourseOnStudent;

export interface IPrismaStudent {
  id: number;
  name: string;
  cpf: string;
  rg: string;
  school_education: string;
  birth_date: Date;
  created_at: Date;
  course_on_student: CourseOnStudentModel[];
}

export interface IListAllStudent {
  meta?: IMeta;
  students: Student[];
}
export interface IParamsListAllStudent {
  page: number;
  perPage: number;
}
