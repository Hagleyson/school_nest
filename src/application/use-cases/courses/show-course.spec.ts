import { InMemoryCourseRepository } from '../../../test/repositories/in-memory-notification-repository';
import { CreateCourse } from './create-course';
import { ShowCourse } from './show-course';

describe('Create course use cases', () => {
  it('should be able to create course', async () => {
    const courseRepository = new InMemoryCourseRepository();
    const createCourse = new CreateCourse(courseRepository);

    const showCourse = new ShowCourse(courseRepository);

    const { course } = await createCourse.execute({
      name: 'string',
      content: 'string',
      period: 'string',
      teacher_name: 'string',
    });

    const list = await showCourse.execute({ id: course.id });
    expect(list.course).toEqual(course);
  });
});
