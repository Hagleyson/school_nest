import { Course } from '@application/entities/courses';
import { Student } from '@application/entities/student';
import * as moment from 'moment';
import { IPrismaStudent } from 'src/shared/interfaces';

export class PrismaStudentMapper {
  static toPrisma(student: Student) {
    const formattedData = {
      id: student.id,
      birth_date: moment(student.birth_date, 'DD/MM/YYYY').toDate(),
      cpf: student.cpf,
      created_at: new Date(),
      name: student.name,
      rg: student.rg,
      school_education: student.school_education,
      email: student.email,
      password: student.password,
    };

    return formattedData;
  }

  static toDomain(raw: IPrismaStudent) {
    return new Student(
      {
        birth_date: raw.birth_date,
        cpf: raw.cpf,
        name: raw.name,
        rg: raw.rg,
        school_education: raw.school_education,
        email: raw.email,
        course: raw.course_on_student.map(
          (current) => new Course(current.course),
        ),
      },
      raw.id,
    );
  }
}
