import { makeCourse } from '../../../test/factories/course-factory';
import { InMemoryCourseRepository } from '../../../test/repositories/in-memory-course-repository';
import { CreateCourse } from './create-course';

import { ListCourse } from './list-course';

describe('list course use cases', () => {
  it('should be able to list course', async () => {
    const courseRepository = new InMemoryCourseRepository();
    const createCourse = new CreateCourse(courseRepository);

    const findCourse = new ListCourse(courseRepository);
    createCourse.execute(makeCourse());
    createCourse.execute(makeCourse());
    createCourse.execute(makeCourse());
    createCourse.execute(makeCourse());
    createCourse.execute(makeCourse());

    const list = await findCourse.execute();

    expect(list.course).toHaveLength(5);
  });
});
