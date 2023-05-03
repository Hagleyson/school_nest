import { StudentRepository } from '@application/repositories/student-repository';
import { PrismaService } from '../prisma.service';

import { Module } from '@nestjs/common';
import { PrismaStudentRepository } from './repositories/student-repository';

@Module({
  providers: [
    PrismaService,
    {
      provide: StudentRepository,
      useClass: PrismaStudentRepository,
    },
  ],
  exports: [StudentRepository, PrismaService],
})
export class StudentModuleDb {}
