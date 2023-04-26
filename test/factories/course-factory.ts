import { Course, CourseProps } from '@application/entities/courses';

type Override = Partial<CourseProps>;

export function makeCourse(override: Override = {}) {
  return new Course({
    name: 'string',
    content: 'string',
    period: 'string',
    teacher_name: 'string',
    created_at: new Date(),
    ...override,
  });
}
