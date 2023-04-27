import { PrismaService } from '@infra/database/prisma.service';
import { Injectable } from '@nestjs/common';
import { StudentRepository } from '@application/repositories/student-repository';
import { Student } from '@application/entities/student';
import { PrismaStudentMapper } from '../mappers/prisma-students-mapper';
import {
  AddingOrRemovingStudentCourseRequest,
  IListAllStudent,
  IParamsListAllStudent,
  IPrismaStudent,
} from 'src/shared/interfaces';

@Injectable()
export class PrismaStudentRepository implements StudentRepository {
  constructor(private prismaService: PrismaService) {}

  async findById(student_id: number): Promise<Student> {
    const student: IPrismaStudent = await this.prismaService.student.findUnique(
      {
        where: { id: student_id },
        include: { course_on_student: { include: { course: true } } },
      },
    );
    if (!student) {
      return null;
    }
    return PrismaStudentMapper.toDomain(student);
  }
  async findAll({
    page = 1,
    perPage = 10,
  }: IParamsListAllStudent): Promise<IListAllStudent> {
    const totalItems = await this.prismaService.student.count();
    const student: IPrismaStudent[] = await this.prismaService.student.findMany(
      {
        skip: +page === 1 ? 0 : +page * +perPage,
        take: +perPage,
        include: { course_on_student: { include: { course: true } } },
      },
    );

    return {
      meta: {
        current_page: +page,
        total_pages: Math.ceil(+totalItems / +perPage),
      },
      students: student.map((element) => PrismaStudentMapper.toDomain(element)),
    };
  }
  async create(student: Student): Promise<void> {
    const raw = PrismaStudentMapper.toPrisma(student);
    await this.prismaService.student.create({ data: raw });
  }

  async update(id: number, student: Student): Promise<void> {
    const raw = PrismaStudentMapper.toPrisma(student);

    await this.prismaService.student.update({
      where: { id: +id },
      data: raw,
    });
  }
  async delete(student_id: number): Promise<void> {
    await this.prismaService.student.delete({ where: { id: +student_id } });
  }

  async addingOrRemovingStudentCourse({
    student,
  }: AddingOrRemovingStudentCourseRequest): Promise<void> {
    const create_relationship = student.course.map((current) => ({
      course_id: current.id,
      student_id: student.id,
    }));

    await this.prismaService.$transaction([
      this.prismaService.courseOnStudent.deleteMany({
        where: { student_id: student.id },
      }),
      this.prismaService.courseOnStudent.createMany({
        data: create_relationship,
      }),
    ]);
  }
}
