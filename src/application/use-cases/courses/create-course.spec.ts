import { InMemoryCourseRepository } from '@test/repositories/in-memory-course-repository';
import { CreateCourse } from './create-course';

import { ListCourse } from './list-course';

describe('Create course use cases', () => {
  it('should be able to create course', async () => {
    const courseRepository = new InMemoryCourseRepository();
    const createCourse = new CreateCourse(courseRepository);
    const findCourse = new ListCourse(courseRepository);

    const { course } = await createCourse.execute({
      name: 'string',
      content: 'string',
      period: 'string',
      teacher_name: 'string',
    });

    const list = await findCourse.execute();

    expect(list.courses).toHaveLength(1);
    expect(courseRepository.courses[0]).toEqual(course);
  });
});
