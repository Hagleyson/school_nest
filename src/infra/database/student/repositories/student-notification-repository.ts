import { PrismaService } from '@infra/database/prisma.service';
import { Injectable } from '@nestjs/common';
import { StudentRepository } from '@application/repositories/student-repository';
import { Student } from '@application/entities/student';
import { PrismaCourseMapper } from '../mappers/prisma-students-mapper';

@Injectable()
export class PrismaStudentRepository implements StudentRepository {
  constructor(private prismaService: PrismaService) {}
  async create(student: Student): Promise<void> {
    const raw = PrismaCourseMapper.toPrisma(student);
    await this.prismaService.student.create({ data: raw });
  }
  findById(student_id: number): Promise<Student> {
    throw new Error('Method not implemented.');
  }
  findAll(): Promise<Student[]> {
    throw new Error('Method not implemented.');
  }
  update(id: number, student: Student): Promise<void> {
    throw new Error('Method not implemented.');
  }
  delete(student_id: number): Promise<void> {
    throw new Error('Method not implemented.');
  }
}
