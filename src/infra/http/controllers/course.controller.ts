import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';

import {
  CreateCourse,
  DeleteCourse,
  ListCourse,
  ShowCourse,
  UpdateCourse,
} from '@application/use-cases';
import { CreateCourseBody } from '../dto/course/create-course-body';

@Controller('courses')
export class CoursesController {
  constructor(
    private createCourse: CreateCourse,
    private deleteCourseById: DeleteCourse,
    private listCourse: ListCourse,
    private showCourse: ShowCourse,
    private updateCourse: UpdateCourse,
  ) {}

  @Post()
  async create(@Body() body: CreateCourseBody) {
    await this.createCourse.execute(body);
    return {
      ...body,
    };
  }
  @Put(':id')
  async update(@Param('id') id: number, @Body() body: CreateCourseBody) {
    await this.updateCourse.execute({ ...body, id });

    return { ...body, id };
  }
  @Delete(':id')
  async deleteCourse(@Param('id') id: number) {
    return await this.deleteCourseById.execute({ id });
  }

  @Get()
  async list() {
    const courses = await this.listCourse.execute();
    return {
      ...courses,
    };
  }
  @Get(':id')
  async show(@Param('id') id: number): Promise<any> {
    const courses = await this.showCourse.execute({ id });
    return {
      ...courses,
    };
  }
}
