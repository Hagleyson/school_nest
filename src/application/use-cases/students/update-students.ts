import { Injectable } from '@nestjs/common';
import { Course } from '../../entities/courses';

import { Student } from '../../entities/student';
import { StudentRepository } from '../../repositories/student-repository';
import { StudentNotFound } from './erros/student-not-found';

interface updateStudentRequest {
  id: number;
  name: string;
  cpf: string;
  rg: string;
  school_education: string;
  email: string;
  birth_date: Date;
  created_at?: Date;
}

interface updateStudentResponse {
  student: Student;
}

@Injectable()
export class UpdateStudent {
  constructor(private studentRepository: StudentRepository) {}

  async execute({
    id,
    name,
    cpf,
    rg,
    school_education,
    email,
    birth_date,
    created_at,
  }: updateStudentRequest): Promise<updateStudentResponse> {
    const filterStudent = await this.studentRepository.findById(+id);
    if (!filterStudent) {
      throw new StudentNotFound();
    }
    const student = new Student({
      name,
      cpf,
      rg,
      school_education,
      email,
      birth_date,
      created_at,
    });

    await this.studentRepository.update(id, student);
    return { student };
  }
}
