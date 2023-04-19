import { InMemoryCourseRepository } from '../../../test/repositories/in-memory-notification-repository';
import { CreateCourse } from './create-course';
import { makeCourse } from '../../../test/factories/course-factory';
import { ListCourse } from './list-course';

describe('Create course use cases', () => {
  it('should be able to create course', async () => {
    const courseRepository = new InMemoryCourseRepository();
    const createCourse = new CreateCourse(courseRepository);
    const findCourse = new ListCourse(courseRepository);
    const course = makeCourse();

    await createCourse.execute(course);
    const list = await findCourse.execute();
    console.log(list);
  });
});
