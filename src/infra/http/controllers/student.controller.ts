import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  Request,
} from '@nestjs/common';

import { AddingOrRemoveStudentCourseBody, CreateStudentBody } from '../dto';
import {
  CreateStudent,
  DeleteStudents,
  FindByEmailUseCase,
  ListStudent,
  ShowStudents,
  UpdateStudent,
} from '@application/use-cases';
import { AddingOrRemovingStudentCourse } from '@application/use-cases/students/adding-or-removing-student-course';
import { UpdateStudentBody } from '../dto/student/update-student-body';
import { IsPublic } from 'src/auth/decorators/is-public.decorator';

@Controller('student')
export class StudentController {
  constructor(
    private createStudent: CreateStudent,
    private showStudent: ShowStudents,
    private listStudent: ListStudent,
    private updateStudent: UpdateStudent,
    private deleteStudentById: DeleteStudents,
    private addingOrRemoveCourse: AddingOrRemovingStudentCourse,
    private findByEmailAddress: FindByEmailUseCase,
  ) {}

  @Post()
  @IsPublic()
  async create(@Body() body: CreateStudentBody) {
    const { birth_date, cpf, name, rg, school_education, email, password } =
      body;
    await this.createStudent.execute({
      name,
      cpf,
      rg,
      school_education,
      birth_date,
      email,
      password,
    });
    return {
      ...body,
    };
  }
  @Put(':id')
  async update(@Param('id') id: number, @Body() body: UpdateStudentBody) {
    const { birth_date, cpf, name, rg, school_education, email } = body;
    await this.updateStudent.execute({
      id,
      birth_date,
      cpf,
      name,
      rg,
      school_education,
      email,
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
  async list(@Request() request) {
    const student = await this.listStudent.execute(request.query);
    return {
      ...student,
    };
  }
  @Get('/show/:id')
  async show(@Param('id') id: number): Promise<any> {
    const student = await this.showStudent.execute({ id });
    return {
      ...student,
    };
  }

  @Get('/email')
  async findByEmail(@Query('email') email: string): Promise<any> {
    const student = await this.findByEmailAddress.execute({ email });
    return {
      ...student,
    };
  }

  @Put()
  async addingOrRemoveCourseStudent(
    @Body() body: AddingOrRemoveStudentCourseBody,
  ): Promise<any> {
    await this.addingOrRemoveCourse.execute({ ...body });
    return { message: 'Successful Creation' };
  }
}
