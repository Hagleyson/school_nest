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
import { CreateStudent } from '@application/use-cases';

@Controller('student')
export class StudentController {
  constructor(private createStudent: CreateStudent) {}

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
      body,
    };
  }
  @Put(':id')
  async update(@Param('id') id: string) {
    return {
      id,
    };
  }
  @Delete(':id')
  async deleteStudent(@Param('id') id: string) {
    return {
      id,
    };
  }
  @Get()
  async list() {
    return {
      body: 'all',
    };
  }
  @Get(':id')
  async show(@Param('id') id: string) {
    return {
      id,
    };
  }
}
