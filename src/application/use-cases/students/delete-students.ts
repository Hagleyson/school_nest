import { Injectable } from '@nestjs/common';

import { Student } from '../../entities/student';
import { StudentRepository } from '../../repositories/student-repository';

interface showStudentRequest {
  id: string;
}

interface showStudentResponse {
  student: Student;
}

@Injectable()
export class DeleteStudents {
  constructor(private studentRepository: StudentRepository) {}

  async execute({ id }: showStudentRequest): Promise<showStudentResponse> {
    const student = await this.studentRepository.findById(id);
    await this.studentRepository.delete(student.id);
    return { student };
  }
}
