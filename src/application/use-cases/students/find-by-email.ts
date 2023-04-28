import { Injectable } from '@nestjs/common';

import { Student } from '../../entities/student';
import { StudentRepository } from '../../repositories/student-repository';
import { StudentNotFound } from './erros/student-not-found';

interface showStudentRequest {
  email: string;
}

interface showStudentResponse {
  student: Student;
}

@Injectable()
export class FindByEmailUseCase {
  constructor(private studentRepository: StudentRepository) {}

  async execute({ email }: showStudentRequest): Promise<showStudentResponse> {
    const student = await this.studentRepository.findByEmail(email);
    if (!student) {
      throw new StudentNotFound();
    }
    return { student };
  }
}
