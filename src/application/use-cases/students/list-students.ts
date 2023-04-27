import { Injectable } from '@nestjs/common';

import { StudentRepository } from '../../repositories/student-repository';
import { IListAllStudent, IParamsListAllStudent } from 'src/shared/interfaces';
import { Student } from '@application/entities/student';

@Injectable()
export class ListStudent {
  constructor(private studentRepository: StudentRepository) {}

  async execute(
    query: IParamsListAllStudent,
  ): Promise<IListAllStudent | Student[]> {
    return await this.studentRepository.findAll(query);
  }
}
