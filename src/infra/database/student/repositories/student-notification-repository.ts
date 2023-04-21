import { PrismaService } from '@infra/database/prisma.service';
import { Injectable } from '@nestjs/common';
import { StudentRepository } from '@application/repositories/student-repository';
import { Student } from '@application/entities/student';

@Injectable()
export class PrismaStudentRepository implements StudentRepository {
  constructor(private prismaService: PrismaService) {}
  create(student: Student): Promise<void> {
    throw new Error('Method not implemented.');
  }
  findById(student_id: string): Promise<Student> {
    throw new Error('Method not implemented.');
  }
  findAll(): Promise<Student[]> {
    throw new Error('Method not implemented.');
  }
  update(id: string, student: Student): Promise<void> {
    throw new Error('Method not implemented.');
  }
  delete(student_id: string): Promise<void> {
    throw new Error('Method not implemented.');
  }
}
