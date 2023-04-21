import { InMemoryCourseRepository } from '../../../test/repositories/in-memory-course-repository';
import { makeCourse } from '../../../test/factories/course-factory';
import { InMemoryStudentRepository } from '../../../test/repositories/in-memory-student-repository';
import { CreateCourse } from '../courses/create-course';
import { DeleteCourse } from '../courses/delete-course';
import { CreateStudent } from './create-students';
import { ListStudent } from './list-students';
import { DeleteStudents } from './delete-students';

describe('Delete student use cases', () => {
  it('should be able to delete student', async () => {
    const studentRepository = new InMemoryStudentRepository();

    const createStudent = new CreateStudent(studentRepository);
    const deleteStudent = new DeleteStudents(studentRepository);
    const listStudent = new ListStudent(studentRepository);

    const course = makeCourse();

    const { student } = await createStudent.execute({
      birth_date: new Date(),
      cpf: '',
      name: '',
      rg: '',
      school_education: '',
      course: [course],
    });

    await deleteStudent.execute({ id: student.id });
    const { student: list } = await listStudent.execute();

    expect(list).toHaveLength(0);
  });
});
