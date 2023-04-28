import { Injectable } from '@nestjs/common';

import { Student } from '../../entities/student';
import { StudentRepository } from '../../repositories/student-repository';
import * as bcrypt from 'bcrypt';
interface createStudentRequest {
  name: string;
  cpf: string;
  rg: string;
  school_education: string;
  birth_date: Date;
  created_at?: Date;
  email: string;
  password: string;
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
    email,
    password,
  }: createStudentRequest): Promise<createStudentResponse> {
    const student = new Student({
      name,
      cpf,
      rg,
      school_education,
      birth_date,
      email,
      password: await bcrypt.hash(password, 10),
    });

    await this.studentRepository.create(student);
    return { student };
  }
}
