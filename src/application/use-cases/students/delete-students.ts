import { Injectable } from '@nestjs/common';

import { StudentRepository } from '../../repositories/student-repository';
import { StudentNotFound } from './erros/student-not-found';

interface showStudentRequest {
  id: number;
}

interface showStudentResponse {
  message: string;
}

@Injectable()
export class DeleteStudents {
  constructor(private studentRepository: StudentRepository) {}

  async execute({ id }: showStudentRequest): Promise<showStudentResponse> {
    const student = await this.studentRepository.findById(+id);
    if (!student) {
      throw new StudentNotFound();
    }
    await this.studentRepository.delete(student.id);
    return { message: `student ${student.name} deleted` };
  }
}
