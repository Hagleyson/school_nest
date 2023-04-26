import { Course } from '@application/entities/courses';

import { Course as RawCourse } from '@prisma/client';

export class PrismaCourseMapper {
  static toPrisma(course: Course) {
    const formattedData = {
      id: course.id,
      content: course.content,
      name: course.name,
      period: course.period,
      teacher_name: course.teacher_name,
      created_at: course.created_at,
    };

    return formattedData;
  }

  static toDomain(raw: RawCourse) {
    return new Course(
      {
        content: raw.content,
        name: raw.name,
        period: raw.period,
        teacher_name: raw.teacher_name,
        created_at: raw.created_at,
      },
      raw.id,
    );
  }
}
