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

@Controller('student')
export class StudentController {
  constructor() {}

  @Post()
  async create(@Body() body: CreateStudentBody) {
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
