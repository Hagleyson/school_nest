import { Injectable } from '@nestjs/common';
import { Course } from '@application/entities/courses';
import { CourseRepository } from '@application/repositories/course-repository';
import { PrismaService } from '@infra/database/prisma.service';
import { CourseNotFound } from '@application/use-cases/courses/erros/course-not-found';
import { PrismaCourseMapper } from '../mappers/prisma-course-mappers';

@Injectable()
export class PrismaCourseRepository implements CourseRepository {
  constructor(private prismaService: PrismaService) {}

  async findById(course_id: number): Promise<Course> {
    const course = await this.prismaService.course.findUnique({
      where: { id: +course_id },
    });
    if (!course) {
      throw new CourseNotFound();
    }
    return PrismaCourseMapper.toDomain(course);
  }

  async findAll(): Promise<Course[]> {
    const course = await this.prismaService.course.findMany();
    return course.map((item) => PrismaCourseMapper.toDomain(item));
  }

  async create(course: Course): Promise<void> {
    const raw = PrismaCourseMapper.toPrisma(course);
    await this.prismaService.course.create({ data: raw });
  }

  async update(id: number, course: Course): Promise<void> {
    const raw = PrismaCourseMapper.toPrisma(course);

    await this.prismaService.course.update({
      where: { id: +id },
      data: raw,
    });
  }
  async delete(id: number): Promise<void> {
    await this.prismaService.course.delete({ where: { id: +id } });
  }
}
