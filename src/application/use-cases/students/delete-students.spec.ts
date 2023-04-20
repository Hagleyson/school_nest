import { makeCourse } from '../../../test/factories/course-factory';
import { InMemoryStudentRepository } from '../../../test/repositories/in-memory-student-repository';
import { DeleteCourse } from '../courses/delete-course';
import { CreateStudent } from './create-students';
import { ListStudent } from './list-students';

describe('Delete student use cases', () => {
  const studentRepository = new InMemoryStudentRepository();
  const createStudent = new CreateStudent(studentRepository);
  const deleteCourse = new DeleteCourse(studentRepository);
});
