import { Injectable } from '@nestjs/common';

import { Student } from '../../entities/student';
import { StudentRepository } from '../../repositories/student-repository';
import { Course } from '@application/entities/courses';

interface createStudentRequest {
  name: string;
  cpf: string;
  rg: string;
  school_education: string;
  birth_date: Date;
  created_at?: Date;
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
    birth_date,
  }: createStudentRequest): Promise<createStudentResponse> {
    const student = new Student({
      name,
      cpf,
      rg,
      school_education,
      birth_date,
    });

    await this.studentRepository.create(student);
    return { student };
  }
}
