import { Injectable } from '@nestjs/common';
import { Course } from '../../entities/courses';

import { Student } from '../../entities/student';
import { StudentRepository } from '../../repositories/student-repository';

interface createStudentRequest {
  name: string;
  cpf: string;
  rg: string;
  school_education: string;
  course?: Course[];
  birth_date: Date;
  createdAt?: Date;
}

interface createStudentResponse {
  student: Student;
}

@Injectable()
export class CreateStudent {
  constructor(private studentRepository: StudentRepository) {}

  async execute({
    name,
    cpf,
    rg,
    school_education,
    course,
    birth_date,
  }: createStudentRequest): Promise<createStudentResponse> {
    const student = new Student({
      name,
      cpf,
      rg,
      school_education,
      course,
      birth_date,
    });

    await this.studentRepository.create(student);
    return { student };
  }
}
