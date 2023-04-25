import { PrismaService } from '@infra/database/prisma.service';
import { Injectable } from '@nestjs/common';
import { StudentRepository } from '@application/repositories/student-repository';
import { Student } from '@application/entities/student';
import { PrismaStudentMapper } from '../mappers/prisma-students-mapper';

@Injectable()
export class PrismaStudentRepository implements StudentRepository {
  constructor(private prismaService: PrismaService) {}
  async findById(student_id: number): Promise<Student> {
    const student = await this.prismaService.student.findUnique({
      where: { id: student_id },
    });
    if (!student) {
      return null;
    }
    return PrismaStudentMapper.toDomain(student);
  }
  async findAll(): Promise<Student[]> {
    const student = await this.prismaService.student.findMany();
    return student.map((element) => PrismaStudentMapper.toDomain(element));
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
}
