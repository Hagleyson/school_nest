import { Injectable } from '@nestjs/common';
import { Course } from '../../entities/courses';

import { Student } from '../../entities/student';
import { StudentRepository } from '../../repositories/student-repository';

interface updateStudentRequest {
  id: number;
  name: string;
  cpf: string;
  rg: string;
  school_education: string;
  course?: Course[];
  birth_date: Date;
  createdAt?: Date;
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
    course,
    birth_date,
    createdAt,
  }: updateStudentRequest): Promise<updateStudentResponse> {
    const student = new Student({
      name,
      cpf,
      rg,
      school_education,
      course,
      birth_date,
      createdAt,
    });
    await this.studentRepository.update(id, student);
    return { student };
  }
}
