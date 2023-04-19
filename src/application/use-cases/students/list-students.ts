import { Injectable } from '@nestjs/common';
import { Student } from '../../entities/student';
import { StudentRepository } from '../../repositories/student-repository';

interface listStudentResponse {
  student: Student[];
}

@Injectable()
export class ListStudent {
  constructor(private studentRepository: StudentRepository) {}

  async execute(): Promise<listStudentResponse> {
    const student = await this.studentRepository.findAll();
    return { student };
  }
}
