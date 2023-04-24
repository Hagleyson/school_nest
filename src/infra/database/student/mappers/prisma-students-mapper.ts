import { Student } from '@application/entities/student';
import { Student as RawStudent } from '@prisma/client';
import * as moment from 'moment';

export class PrismaCourseMapper {
  static toPrisma(student: Student) {
    const formattedData = {
      id: student.id,
      birth_date: moment(student.birth_date, 'DD/MM/YYYY').toDate(),
      cpf: student.cpf,
      createdAt: new Date(),
      name: student.name,
      rg: student.rg,
      school_education: student.school_education,
    };
    console.log(formattedData);
    return formattedData;
  }

  static toDomain(raw: RawStudent) {
    return new Student(
      {
        birth_date: raw.birth_date,
        cpf: raw.cpf,
        name: raw.name,
        rg: raw.rg,
        school_education: raw.school_education,
      },
      raw.id,
    );
  }
}
