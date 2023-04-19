import { InMemoryCourseRepository } from '../../../test/repositories/in-memory-notification-repository';
import { CreateCourse } from './create-course';
import { DeleteCourse } from './delete-course';

import { ListCourse } from './list-course';

describe('Create course use cases', () => {
  it('should be able to create course', async () => {
    const courseRepository = new InMemoryCourseRepository();
    const createCourse = new CreateCourse(courseRepository);
    const deleteCourse = new DeleteCourse(courseRepository);
    const findCourse = new ListCourse(courseRepository);

    const { course } = await createCourse.execute({
      name: 'string',
      content: 'string',
      period: 'string',
      teacher_name: 'string',
    });
    const { course: course1 } = await createCourse.execute({
      name: 'string',
      content: 'string',
      period: 'string',
      teacher_name: 'string',
    });
    await deleteCourse.execute({ id: course.id });

    const list = await findCourse.execute();

    expect(list.course).toHaveLength(1);
    expect(courseRepository.courses[0]).toEqual(course1);
  });
});
