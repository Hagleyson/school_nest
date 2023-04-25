import { PrismaService } from '../prisma.service';

import { Module } from '@nestjs/common';
import { CourseRepository } from '@application/repositories/course-repository';
import { PrismaCourseRepository } from './repositories/course-repository';

@Module({
  providers: [
    PrismaService,
    {
      provide: CourseRepository,
      useClass: PrismaCourseRepository,
    },
  ],
  exports: [CourseRepository],
})
export class CourseModuleDb {}
