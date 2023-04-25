import { InMemoryCourseRepository } from '@test/repositories/in-memory-course-repository';
import { CreateCourse } from './create-course';

import { ListCourse } from './list-course';
import { UpdateCourse } from './update-course';

describe('Update course use cases', () => {
  it('should be able to update course', async () => {
    const courseRepository = new InMemoryCourseRepository();
    const createCourse = new CreateCourse(courseRepository);
    const updateCourse = new UpdateCourse(courseRepository);
    const findCourse = new ListCourse(courseRepository);

    const { course } = await createCourse.execute({
      name: 'string',
      content: 'string',
      period: 'string',
      teacher_name: 'string',
    });
    await createCourse.execute({
      name: 'string',
      content: 'string',
      period: 'string',
      teacher_name: 'string',
    });
    const { course: updatedCourse } = await updateCourse.execute({
      id: course.id,
      name: 'name',
      content: 'content',
      period: 'period',
      teacher_name: 'teacher_name',
    });
    const list = await findCourse.execute();

    expect(list.course).toHaveLength(2);
    expect(courseRepository.courses[0]).toEqual(updatedCourse);
    expect(courseRepository.courses[1]).not.toEqual(updatedCourse);
  });
});
