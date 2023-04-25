import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';

import { CreateStudentBody } from '../dto';
import {
  CreateStudent,
  DeleteStudents,
  ListStudent,
  ShowStudents,
  UpdateStudent,
} from '@application/use-cases';

@Controller('student')
export class StudentController {
  constructor(
    private createStudent: CreateStudent,
    private showStudent: ShowStudents,
    private listStudent: ListStudent,
    private updateStudent: UpdateStudent,
    private deleteStudentById: DeleteStudents,
  ) {}

  @Post()
  async create(@Body() body: CreateStudentBody) {
    const { birth_date, cpf, name, rg, school_education, course } = body;
    await this.createStudent.execute({
      name,
      cpf,
      rg,
      school_education,
      birth_date,
    });
    return {
      ...body,
    };
  }
  @Put(':id')
  async update(@Param('id') id: number, @Body() body: CreateStudentBody) {
    const { birth_date, cpf, name, rg, school_education, course } = body;
    await this.updateStudent.execute({
      id,
      birth_date,
      cpf,
      name,
      rg,
      school_education,
    });
    return {
      ...body,
    };
  }
  @Delete(':id')
  async deleteStudent(@Param('id') id: number) {
    const student = await this.deleteStudentById.execute({ id });
    return {
      ...student,
    };
  }
  @Get()
  async list() {
    const student = await this.listStudent.execute();
    return {
      ...student,
    };
  }
  @Get(':id')
  async show(@Param('id') id: number): Promise<any> {
    const student = await this.showStudent.execute({ id });
    return {
      ...student,
    };
  }
}
